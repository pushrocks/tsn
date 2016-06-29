import "typings-global";
import * as plugins from "./tsn.plugins";

let compiler = (fileNames: string[], options: plugins.ts.CompilerOptions): void => {
    let program = plugins.ts.createProgram(fileNames, options);
    let emitResult = program.emit();

    let allDiagnostics = plugins.ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

    allDiagnostics.forEach((diagnostic) => {
        let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
        let message = plugins.ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
        console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
    });

    let exitCode = emitResult.emitSkipped ? 1 : 0;
    console.log(`Process exiting with code '${exitCode}'.`);
    process.exit(exitCode);
}

let compilerOptions:plugins.ts.CompilerOptions = {
    declaration: true,
    inlineSourceMap: true,
    noEmitOnError: true,
    noImplicitAny: true,
    target: plugins.ts.ScriptTarget.ES5,
    module: plugins.ts.ModuleKind.CommonJS
};

export let compile = (filesArg:string[],outDirArg:string) => {
    let assignedOptions:plugins.ts.CompilerOptions = {};
    assignedOptions = plugins.lodash.assign(assignedOptions,compiler,{outDir:outDirArg});
    compiler(filesArg,assignedOptions);
}