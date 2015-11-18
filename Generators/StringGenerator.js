/// <reference path="../Models/CPPTypeModel.ts" />
var CodeGenerator;
(function (CodeGenerator) {
    var Generators;
    (function (Generators) {
        var StringGenerator = (function () {
            function StringGenerator(classModel) {
                this.classModel = classModel;
            }
            StringGenerator.prototype.getClassString = function () {
                var classDefinition = "";
                var includeGuard = this.createIncludeGuard();
                classDefinition += "#ifndef " + includeGuard + "\n";
                classDefinition += "#define " + includeGuard + "\n";
                classDefinition += this.createClassDefinition();
                classDefinition += "#endif //" + includeGuard;
                return classDefinition;
            };
            StringGenerator.prototype.createIncludeGuard = function () {
                var includeGuard = "__";
                this.classModel.namespaces.forEach(function (element) {
                    includeGuard += element.toUpperCase() + "__";
                });
                includeGuard += this.classModel.className.toUpperCase() + "__HPP__";
                return includeGuard;
            };
            StringGenerator.prototype.createClassDefinition = function () {
                var _this = this;
                var classDefinition = "";
                var tabCount = 0;
                this.classModel.namespaces.forEach(function (nameSpace) {
                    classDefinition += _this.tabsString(tabCount) + "namespace " + nameSpace + "\n";
                    classDefinition += _this.tabsString(tabCount) + "{\n";
                    tabCount++;
                });
                classDefinition += this.tabsString(tabCount) + "class " + this.classModel.className + "\n";
                classDefinition += this.tabsString(tabCount) + "{\n";
                classDefinition += this.tabsString(tabCount + 1) + "public:\n";
                classDefinition += this.tabsString(tabCount + 1) + "protected:\n";
                classDefinition += this.tabsString(tabCount + 1) + "private:\n";
                classDefinition += this.tabsString(tabCount) + "};\n";
                this.classModel.namespaces.forEach(function (nameSpace) {
                    tabCount--;
                    classDefinition += _this.tabsString(tabCount) + "}\n";
                });
                return classDefinition;
            };
            StringGenerator.prototype.tabsString = function (tabCount) {
                var tabStr = "";
                for (var index = 0; index < tabCount; index++) {
                    tabStr += "\t";
                }
                return tabStr;
            };
            return StringGenerator;
        })();
        Generators.StringGenerator = StringGenerator;
    })(Generators = CodeGenerator.Generators || (CodeGenerator.Generators = {}));
})(CodeGenerator || (CodeGenerator = {}));
//# sourceMappingURL=StringGenerator.js.map