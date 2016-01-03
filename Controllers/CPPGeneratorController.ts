/// <reference path="../Models/CPPTypeModel.ts" />
/// <reference path="../Generators/StringGenerator.ts" />
/// <reference path="../../typings/angularjs/angular.d.ts" />
module CodeGenerator.Controllers {
    export interface CPPGeneratorScope extends angular.IScope {
        typeModel: Models.CPPTypeModel;
        
        namespaceTextBox: string;
        classOutput: string;
        
        createClass: () => void;
        
        addMember: () => void;
    }
    
	export class CPPGeneratorController {        
		constructor(private $scope: CPPGeneratorScope) {
			$scope.typeModel = {
                className:"",
                members:[],
                namespaces:[],
                properties:[]
            }
            
            $scope.addMember = () => { this.addMember(); };
            $scope.createClass = () => { this.setClass(); };
            
            this.setupWatches();
		}
        
        
        private setupWatches() : void {
            //watch namespaces entry
            this.$scope.$watch(() => { return this.$scope.namespaceTextBox; }, (newValue, oldValue) => {
                if (newValue && this.$scope.typeModel.className && newValue !== '' && this.$scope.typeModel.className!== '') {
                    this.setClass();
                }
            });
            
            //watch classes entry
            this.$scope.$watch(() => { return this.$scope.typeModel.className; }, (newValue, oldValue) => {
                if (newValue && this.$scope.namespaceTextBox && newValue !== '' && this.$scope.namespaceTextBox !== '') {
                    this.setClass();
                }
            });
        }
        
        private addMember() : void {
            this.$scope.typeModel.members.push({
                constant: false,
                isolationLevel: Models.IsolationLevel.private,
                name: '',
                noexcept: false,
                parameters:[],
                returnType: '',
                templateArgs:[],
                virtual: false
            })
        }
        
        private setClass() : void {
            //check to see if namespaces can be split
            if (!this.$scope.namespaceTextBox || this.$scope.namespaceTextBox === '') {
                return;
            }
            
            //set the namespaces to a proper split
            this.$scope.typeModel.namespaces = this.$scope.namespaceTextBox.split('.');
            
            //create a class output generator and set the output to the class field
            var stringGenerator = new CodeGenerator.Generators.StringGenerator(this.$scope.typeModel);
            this.$scope.classOutput = stringGenerator.getClassString();
        }
	}
}
angular.module("CodeGenerator").controller('CPPGeneratorController',['$scope',CodeGenerator.Controllers.CPPGeneratorController])