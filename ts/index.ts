// import all the stuff we need
import * as plugins from "./tsn.plugins";

let compiler = (fileNames: string[], options: plugins.ts.CompilerOptions): void => {
    let done = plugins.q.defer();
    let program = plugins.ts.createProgram(fileNames, options);
    let emitResult = program.emit();

    let allDiagnostics = plugins.ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

    allDiagnostics.forEach((diagnostic) => {
        let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
        let message = plugins.ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
        console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
    });

    let exitCode = emitResult.emitSkipped ? 1 : 0;
    if(exitCode == 0){
        plugins.beautylog.ok("TypeScript emit succeeded!");
        done.resolve();
    } else {
        plugins.beautylog.error("TypeScript emit failed. Please investigate!");
        process.exit(exitCode);
    }
    return done.promise;
}

let compilerOptions:plugins.ts.CompilerOptions = {
    declaration: true,
    inlineSourceMap: true,
    noEmitOnError: false,
    noImplicitAny: false,
    target: plugins.ts.ScriptTarget.ES6,
    module: plugins.ts.ModuleKind.CommonJS
};

export let compile = (filesArg:string[],outDirArg:string) => {
    let assignedOptions:plugins.ts.CompilerOptions = {};
    assignedOptions = plugins.lodash.assign(assignedOptions,compilerOptions,{outDir:outDirArg}); // create final options
    plugins.beautylog.info("checking files before compilation");
    return compiler(filesArg,assignedOptions); // return the promise from compiler(); 
}