/// <reference path="../Models/CPPTypeModel.ts" />
module CodeGenerator.Extensions {
    export interface IExtension {
        typeModel: Models.CPPTypeModel;
        preIncludeGuard() : string;
        postIncludeGuard() : string;
        preNamespaces(): string;
        preNamespace(namespace: string): string;
        postNamespace(namespace: string) : string;
        postNamespaces(): string;
        preClass(): string;
        postClass(): string;
        startInsideClass(): string;
        endInsideClass(): string;
        preMember(isolationLevel: Models.IsolationLevel, member: Models.CPPTypeMember);
        postMember(isolationLevel: Models.IsolationLevel, member: Models.CPPTypeMember);
        preEndInclude() : string;
        postEndInclude(): string;
    }
}