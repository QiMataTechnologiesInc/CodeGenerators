/// <reference path="../Models/CPPTypeModel.ts" />
var CodeGenerator;
(function (CodeGenerator) {
    var Generators;
    (function (Generators) {
        class StringGenerator {
            constructor(classModel) {
                this.classModel = classModel;
            }
            getClassString() {
                let classDefinition = "";
                let includeGuard = this.createIncludeGuard();
                classDefinition += "#ifndef " + includeGuard + "\n";
                classDefinition += "#define " + includeGuard + "\n\n";
                classDefinition += this.createClassDefinition();
                classDefinition += "#endif //" + includeGuard;
                return classDefinition;
            }
            createIncludeGuard() {
                let includeGuard = "__";
                this.classModel.namespaces.forEach(element => {
                    includeGuard += element.toUpperCase() + "__";
                });
                includeGuard += this.classModel.className.toUpperCase() + "__HPP__";
                return includeGuard;
            }
            createClassDefinition() {
                let classDefinition = "";
                let tabCount = 0;
                this.classModel.namespaces.forEach(nameSpace => {
                    classDefinition += this.tabsString(tabCount) + "namespace " + nameSpace + "\n";
                    classDefinition += this.tabsString(tabCount) + "{\n";
                    tabCount++;
                });
                classDefinition += this.tabsString(tabCount) + "class " + this.classModel.className + "\n";
                classDefinition += this.tabsString(tabCount) + "{\n";
                classDefinition += this.tabsString(tabCount + 1) + "public:\n";
                classDefinition += this.tabsString(tabCount + 1) + "protected:\n";
                classDefinition += this.tabsString(tabCount + 1) + "private:\n";
                classDefinition += this.tabsString(tabCount) + "};\n";
                this.classModel.namespaces.forEach(nameSpace => {
                    tabCount--;
                    classDefinition += this.tabsString(tabCount) + "}\n";
                });
                return classDefinition;
            }
            tabsString(tabCount) {
                let tabStr = "";
                for (var index = 0; index < tabCount; index++) {
                    tabStr += "\t";
                }
                return tabStr;
            }
            createMemberDefinitions(isolationLevel, tabCount) {
                let memberDefinitions = "";
                this.classModel.members.forEach(member => {
                    if (member.isolationLevel !== isolationLevel) {
                        return;
                    }
                    if (member.templateArgs.length) {
                        memberDefinitions += "template <";
                        for (let i = 0; i < member.templateArgs.length; i++) {
                            let template = member.templateArgs[i];
                            memberDefinitions += template.type + " " + template.name;
                            if (i !== member.templateArgs.length - 1) {
                                memberDefinitions += ",";
                            }
                        }
                        memberDefinitions += "> ";
                    }
                    if (member.virtual) {
                        memberDefinitions += "virtual ";
                    }
                    memberDefinitions += member.returnType + " " + member.name + "(";
                    for (let i = 0; i < member.parameters.length; i++) {
                        let param = member.parameters[i];
                        if (param.const) {
                            memberDefinitions += "const ";
                        }
                        memberDefinitions += param.type + " " + param.name;
                        if (i !== member.parameters.length - 1) {
                            memberDefinitions += ",";
                        }
                    }
                    memberDefinitions += ")";
                    if (member.constant) {
                        memberDefinitions += " const";
                    }
                    if (member.noexcept) {
                        memberDefinitions += " noexcept";
                    }
                });
            }
        }
        Generators.StringGenerator = StringGenerator;
    })(Generators = CodeGenerator.Generators || (CodeGenerator.Generators = {}));
})(CodeGenerator || (CodeGenerator = {}));
//# sourceMappingURL=StringGenerator.js.map