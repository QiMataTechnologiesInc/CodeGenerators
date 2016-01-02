/// <reference path="../Models/CPPTypeModel.ts" />
/// <reference path="../../typings/angularjs/angular.d.ts" />
var CodeGenerator;
(function (CodeGenerator) {
    var Controllers;
    (function (Controllers) {
        class CPPMemberController {
            constructor($scope) {
                this.$scope = $scope;
            }
        }
        Controllers.CPPMemberController = CPPMemberController;
    })(Controllers = CodeGenerator.Controllers || (CodeGenerator.Controllers = {}));
})(CodeGenerator || (CodeGenerator = {}));
angular.module("CodeGenerator").controller('CPPMemberController', ['$scope', CodeGenerator.Controllers.CPPMemberController]);
//# sourceMappingURL=CPPMemberController.js.map