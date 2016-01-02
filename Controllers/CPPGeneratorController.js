/// <reference path="../Models/CPPTypeModel.ts" />
/// <reference path="../Generators/StringGenerator.ts" />
/// <reference path="../../typings/angularjs/angular.d.ts" />
var CodeGenerator;
(function (CodeGenerator) {
    var Controllers;
    (function (Controllers) {
        class CPPGeneratorController {
            constructor($scope) {
                this.$scope = $scope;
                $scope.typeModel = {
                    className: "",
                    members: [],
                    namespaces: [],
                    properties: []
                };
                $scope.addMember = this.addMember;
                this.setupWatches();
            }
            setupWatches() {
                //watch namespaces entry
                this.$scope.$watch(function () { return this.$scope.namespaceTextBox; }, function (newValue, oldValue) {
                    if (newValue && this.$scope.typeModel.className && newValue !== '' && this.$scope.typeModel.className !== '') {
                        this.setClass();
                    }
                });
                //watch classes entry
                this.$scope.$watch(function () { return this.$scope.typeModel.className; }, function (newValue, oldValue) {
                    if (newValue && this.$scope.namespaceTextBox && newValue !== '' && this.$scope.namespaceTextBox !== '') {
                        this.setClass();
                    }
                });
            }
            addMember() {
                this.$scope.typeModel.members.push({
                    constant: false,
                    isolationLevel: CodeGenerator.Models.IsolationLevel.private,
                    name: '',
                    noexcept: false,
                    parameters: [],
                    returnType: '',
                    templateArgs: [],
                    virtual: false
                });
            }
            setClass() {
                //set the namespaces to a proper split
                this.$scope.typeModel.namespaces = this.$scope.namespaceTextBox.split('.');
                //create a class output generator and set the output to the class field
                var stringGenerator = new CodeGenerator.Generators.StringGenerator(this.$scope.typeModel);
                this.$scope.classOutput = stringGenerator.getClassString();
            }
        }
        Controllers.CPPGeneratorController = CPPGeneratorController;
    })(Controllers = CodeGenerator.Controllers || (CodeGenerator.Controllers = {}));
})(CodeGenerator || (CodeGenerator = {}));
angular.module("CodeGenerator").controller('CPPGeneratorController', ['$scope', CodeGenerator.Controllers.CPPGeneratorController]);
//# sourceMappingURL=CPPGeneratorController.js.map