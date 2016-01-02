/// <reference path="../Models/CPPTypeModel.ts" />
/// <reference path="../../typings/angularjs/angular.d.ts" />
module CodeGenerator.Controllers {
    interface CPPMemberScope extends angular.IScope, Models.CPPTypeMember {
        
    }
    
    export class CPPMemberController {
        constructor(private $scope: CPPMemberScope) {
            
        }
        
        
    }
}
angular.module("CodeGenerator").controller('CPPMemberController',['$scope', CodeGenerator.Controllers.CPPMemberController])