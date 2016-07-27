import * as plugins from "./tsn.plugins";
export { CompilerOptions, ScriptTarget, ModuleKind } from "typescript";
export declare let compile: (filesArg: string[], outDirArg: string, compilerOptionsArg: plugins.typescript.CompilerOptions) => void;
