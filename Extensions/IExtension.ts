/// <reference path="../Models/CPPTypeModel.ts" />
module CodeGenerator.Extensions {
    export interface IExtension {
        typeModel: Models.CPPTypeModel;
        tabCount: number;
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
        startIsolationLevel(isolationLevel: Models.IsolationLevel) : string;
        endIsolationLevel(isolationLevel: Models.IsolationLevel) : string;
        preMember(isolationLevel: Models.IsolationLevel, member: Models.CPPTypeMember);
        postMember(isolationLevel: Models.IsolationLevel, member: Models.CPPTypeMember);
        preEndInclude() : string;
        postEndInclude(): string;
    }
}