module CodeGenerator.Models {
	export enum IsolationLevel{
		public,
		protected,
		private
	}
	export interface TemplateArg {
		type: string;
		name: string;
	}
	export interface CPPMemberParameter {
		type: string;
		name: string;
		const: boolean;
	}
	export interface CPPTypeProperty {
		type: string;
		name: string;
		hasGetter: boolean;
		hasSetter: boolean;
		getterVirtual: boolean;
		setterVirtual: boolean;
		getterIsolationLevel: IsolationLevel;
		setterIsolationLevel: IsolationLevel;
	}
	export interface CPPTypeMember {
		returnType: string;
		isolationLevel: IsolationLevel
		name: string;
		virtual: boolean;
		templateArgs: TemplateArg[];
		parameters: CPPMemberParameter[];
		constant: boolean;
		noexcept: boolean;
	}
	export interface CPPTypeModel {
		namespaces: string[];
		className: string;
		members: CPPTypeMember[];
		properties: CPPTypeProperty[];
	}
}