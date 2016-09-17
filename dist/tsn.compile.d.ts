/// <reference types="q" />
import * as plugins from './tsn.plugins';
export { CompilerOptions, ScriptTarget, ModuleKind } from 'typescript';
/**
 * compile am array of absolute file paths
 */
export declare let compileFileArray: (fileStringArrayArg: string[], destDir: string, compilerOptionsArg?: plugins.typescript.CompilerOptions) => plugins.q.Promise<void>;
/**
 * compile advanced glob configurations
 * @param globStringArrayArg a array of glob strings
 * {
 *     './some/origin/folder/**\/*.ts': './some/destination/folder'
 * }
 */
export declare let compileGlobStringObject: (globStringArrayArg: any, tsOptionsArg?: plugins.typescript.CompilerOptions, cwdArg?: string) => plugins.q.Promise<void>;
