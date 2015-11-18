/// <reference path="../Models/CPPTypeModel.ts" />
module CodeGenerator.Generators {
	export class StringGenerator {
		constructor(private classModel: Models.CPPTypeModel) {}
		
		public getClassString() : string {
			let classDefinition = "";
			
			let includeGuard = this.createIncludeGuard();
			
			classDefinition += "#ifndef " + includeGuard + "\n";
			classDefinition += "#define " + includeGuard + "\n";
			
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
			classDefinition += this.tabsString(tabCount + 1) + "protected:\n";
			classDefinition += this.tabsString(tabCount + 1) + "private:\n";
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
	}
}