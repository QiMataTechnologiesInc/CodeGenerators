/// <reference path="../Models/CPPTypeModel.ts" />
/// <reference path="../Controllers/CPPGeneratorController.ts" />
/// <reference path="../../typings/angularjs/angular.d.ts" />
module CodeGenerator.Controllers {
    interface CPPMemberScope extends CPPGeneratorScope {
        member: Models.CPPTypeMember;
        
        addTemplateArg: ()=> void;
        addParameter: ()=> void;
    }
    
    export class CPPMemberController {
        constructor(private $scope: CPPMemberScope) {
            this.setWatches();
            
            $scope.addTemplateArg = () => { this.addTemplateArg();};
            $scope.addParameter = () => { this.addParameter();};
        }
        
        private setWatches() : void {
            //watch all members on the type member
            this.$scope.$watch(()=> {return this.$scope.member.constant;},()=>{ this.$scope.createClass();} );
            this.$scope.$watch(()=> {return this.$scope.member.isolationLevel;},()=>{ this.$scope.createClass();} );
            this.$scope.$watch(()=> {return this.$scope.member.noexcept;},()=>{ this.$scope.createClass();} );
            this.$scope.$watch(()=> {return this.$scope.member.virtual;},()=>{ this.$scope.createClass();} );
            this.$scope.$watch(()=> {return this.$scope.member.name;},(newValue,oldValue)=>{
                if (newValue && newValue !== ""){ 
                    this.$scope.createClass();
                }
            });
            this.$scope.$watch(()=> {return this.$scope.member.returnType;},(newValue,oldValue)=>{
                if (newValue && newValue !== ""){ 
                    this.$scope.createClass();
                }
            });
            this.$scope.$watch(()=> {return this.$scope.member.parameters;},(newValue,oldValue)=>{
                if (newValue && newValue.length){ 
                    this.$scope.createClass();
                }
            },true);
            this.$scope.$watch(()=> {return this.$scope.member.templateArgs;},(newValue,oldValue)=>{
                if (newValue && newValue.length){ 
                    this.$scope.createClass();
                }
            },true);
        }
        
        private addTemplateArg() : void {
            this.$scope.member.templateArgs.push({
                name:'',
                type:''
            });
        }
        
        private addParameter() : void{
            this.$scope.member.parameters.push({
               name:'',
               type:'',
               const:false 
            });
        }
    }
}
angular.module("CodeGenerator").controller('CPPMemberController',['$scope', CodeGenerator.Controllers.CPPMemberController])