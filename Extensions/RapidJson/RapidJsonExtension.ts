/// <reference path="../IExtension.ts" />
module CodeGenerator.Extensions.RapidJson {
    export class RapidJsonExtension implements IExtension {
        typeModel: Models.CPPTypeModel;
        tabCount: number;
        
        preIncludeGuard() : string {
            return "";
        }
        postIncludeGuard() : string {
            return "";
        }
        preNamespaces(): string {
            return "";
        }
        preNamespace(namespace: string): string {
            return "";
        }
        postNamespace(namespace: string) : string{
            return "";
        }
        postNamespaces(): string {
            return "";
        }
        preClass(): string {
            return "";
        }
        postClass(): string {
            return "";
        }
        startInsideClass(): string {
            return "";
        }
        endInsideClass(): string {
            return "";
        }
        startIsolationLevel(isolationLevel: Models.IsolationLevel) : string {
            if (isolationLevel !== Models.IsolationLevel.public) {
                 return "";
            }
            
            let rapidJsonSerializerStatement = this.getTabsString(this.tabCount) + "template <typename Writer>\n" +
                                               this.getTabsString(this.tabCount) + "void Serialize(Writer& writer) const {\n" +
                                               this.getTabsString(this.tabCount + 1) + "writer.StartObject();\n";
            
            for (let i = 0; i < this.typeModel.properties.length; i++) {
                let property = this.typeModel.properties[i];
                
                let hasPublicGetter = property.hasGetter && property.getterIsolationLevel === Models.IsolationLevel.public;
                if (!hasPublicGetter) {
                    continue;
                }
                
                
                this.getTabsString(this.tabCount + 1) + "writer.;\n";
            }
        }
        endIsolationLevel(isolationLevel: Models.IsolationLevel) : string {
            return "";
        }
        preMember(isolationLevel: Models.IsolationLevel, member: Models.CPPTypeMember) {
            return "";
        }
        postMember(isolationLevel: Models.IsolationLevel, member: Models.CPPTypeMember) {
            return "";
        }
        preEndInclude() : string {
            return "";
        }
        postEndInclude(): string {
            return "";
        }
        
        private getTabsString(tabCount : number) : string {
            let tabs = "";
            
            for (let i = 0; i < tabCount; i++) {
                tabs += "\t";
            }
            
            return tabs;
        }
        
        private getRapidPropertyTypeMethodName(propertyType: string) : string {
            if (propertyType === "string" || propertyType === "std::string" || propertyType === "cstr") {
                return "String";
            } else if (propertyType === "double" || propertyType === "float") {
                return "Double";
            }
            return "Unknown";
        }
    }
}