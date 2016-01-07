/// <reference path="../Models/CPPTypeModel.ts" />
/// <reference path="../Extensions/IExtension.ts" />
module CodeGenerator.Generators {
	export class StringGenerator {
		constructor(private classModel: Models.CPPTypeModel,private extensions: Extensions.IExtension[]) {}
		
		public getClassString() : string {
			let classDefinition = "";
			
			let includeGuard = this.createIncludeGuard();
			
			classDefinition += "#ifndef " + includeGuard + "\n";
			classDefinition += "#define " + includeGuard + "\n\n";
			
			classDefinition += this.createClassDefinition();
			
			classDefinition += "#endif //" + includeGuard;
			
			return classDefinition;			 
		}
		
		private createIncludeGuard() : string {
			let includeGuard = "__";
			
			this.classModel.namespaces.forEach(element => {
				includeGuard += element.toUpperCase() + "__";
			});
			
			includeGuard += this.classModel.className.toUpperCase() + "__HPP__";
			
			return includeGuard;
		}
		
		private createClassDefinition() : string {
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
            classDefinition += this.tabsString(tabCount + 2) + this.createMemberDefinitions(Models.IsolationLevel.public) + '\n';
            classDefinition += this.tabsString(tabCount + 2) + this.createPropertyDefinitions(Models.IsolationLevel.public,tabCount);
			classDefinition += this.tabsString(tabCount + 1) + "protected:\n";
            classDefinition += this.tabsString(tabCount + 2) + this.createMemberDefinitions(Models.IsolationLevel.protected)+ '\n';
            classDefinition += this.tabsString(tabCount + 2) + this.createPropertyDefinitions(Models.IsolationLevel.public,tabCount);
			classDefinition += this.tabsString(tabCount + 1) + "private:\n";
            classDefinition += this.tabsString(tabCount + 2) + this.createMemberDefinitions(Models.IsolationLevel.private)+ '\n';
            classDefinition += this.tabsString(tabCount + 2) + this.createPropertyDefinitions(Models.IsolationLevel.public,tabCount);
			classDefinition += this.tabsString(tabCount) + "};\n";
			
			this.classModel.namespaces.forEach(nameSpace => {
				tabCount--;
				classDefinition += this.tabsString(tabCount) + "}\n";
			});
			
			return classDefinition;
		}
		
		private tabsString(tabCount : number) {
			let tabStr = "";
			
			for (var index = 0; index < tabCount; index++) {
				tabStr += "\t";
			}
			
			return tabStr;
		}
		
		private createMemberDefinitions(isolationLevel : Models.IsolationLevel) {
			let memberDefinitions = "";
			
			this.classModel.members.forEach(member => {
				if (member.isolationLevel != isolationLevel) {
					return;
				}
				
				if (member.templateArgs.length) {
					memberDefinitions += "template <";
					for(let i = 0; i < member.templateArgs.length; i++) {
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
					if (i !== member.parameters.length -1) {
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
                
                if (member.templateArgs.length)  {
                    memberDefinitions+= '{}'
                } else {
                    memberDefinitions+= ';'
                }
			});
            
            return memberDefinitions;
		}
        
        private createPropertyDefinitions(isolationLevel : Models.IsolationLevel,tabCount: number) {
            let propertyDefinition = "";
            let wroteSomething = false;
            
            for (let i = 0; i < this.classModel.properties.length; i++) {
                let property = this.classModel.properties[i];
                
                if (property.hasGetter && isolationLevel === property.getterIsolationLevel) {
                    if (property.getterVirtual) {
                        propertyDefinition += "virutal ";
                    }
                    propertyDefinition += property.type + " get_" + property.name + "(){ return " + property.name + "_; }\n"
                    wroteSomething = true;
                }
                
                if (property.hasSetter && isolationLevel === property.setterIsolationLevel) {
                    if (wroteSomething) {
                        propertyDefinition += this.tabsString(tabCount);
                    }
                    
                    if (property.setterVirtual) {
                        propertyDefinition += "virtual ";
                    }
                    propertyDefinition += property.type + " set_" + property.name + "(){ return " + property.name + "_; }\n";
                    wroteSomething = true;
                }
                
                if (isolationLevel === Models.IsolationLevel.private) {
                    if (wroteSomething) {
                        propertyDefinition += this.tabsString(tabCount);
                    }
                    
                    propertyDefinition += property.type + " " + property.name + "_;\n";
                }
            }
        }
	}
}