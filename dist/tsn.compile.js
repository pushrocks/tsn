"use strict";
// import all the stuff we need
const plugins = require("./tsn.plugins");
var typescript_1 = require("typescript");
exports.ScriptTarget = typescript_1.ScriptTarget;
exports.ModuleKind = typescript_1.ModuleKind;
/**
 * the default typescript compilerOptions
 */
let compilerOptionsDefault = {
    declaration: true,
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    inlineSourceMap: true,
    noEmitOnError: false,
    module: plugins.typescript.ModuleKind.CommonJS,
    noImplicitAny: false,
    target: plugins.typescript.ScriptTarget.ES6
};
/**
 * merges compilerOptions
 */
let mergeCompilerOptions = function (customTsOptions, outDirArg) {
    // convert strings for module kind etc. to enum values
    if (customTsOptions.module) {
        customTsOptions.module = plugins.typescript.ModuleKind[customTsOptions.module];
    }
    if (customTsOptions.target) {
        customTsOptions.target = plugins.typescript.ScriptTarget[customTsOptions.target];
    }
    // create merged options 
    let mergedOptions = {}; // create base 
    plugins.lodash.merge(// create final options
    mergedOptions, // things get merged into first object
    compilerOptionsDefault, customTsOptions, { outDir: outDirArg });
    return mergedOptions;
};
/**
 * the internal main compiler function that compiles the files
 */
let compiler = (fileNames, options) => {
    let done = plugins.q.defer();
    let program = plugins.typescript.createProgram(fileNames, options);
    let emitResult = program.emit();
    let allDiagnostics = plugins.typescript.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);
    try {
        allDiagnostics.forEach((diagnostic) => {
            let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
            let message = plugins.typescript.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
            console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
        });
    }
    catch (err) {
        console.log(allDiagnostics);
    }
    let exitCode = emitResult.emitSkipped ? 1 : 0;
    if (exitCode === 0) {
        plugins.beautylog.ok('TypeScript emit succeeded!');
        done.resolve();
    }
    else {
        plugins.beautylog.error('TypeScript emit failed. Please investigate!');
        process.exit(exitCode);
    }
    return done.promise;
};
/**
 * compile am array of absolute file paths
 */
exports.compileFileArray = (fileStringArrayArg, destDir, compilerOptionsArg = {}) => {
    plugins.beautylog.info('checking files before compilation');
    return compiler(fileStringArrayArg, mergeCompilerOptions(compilerOptionsArg, destDir)); // return the promise from compiler()
};
/**
 * compile advanced glob configurations
 * @param globStringArrayArg a array of glob strings
 * {
 *     './some/origin/folder/**\/*.ts': './some/destination/folder'
 * }
 */
exports.compileGlobStringObject = (globStringObjectArg, tsOptionsArg = {}, cwdArg = process.cwd()) => {
    let done = plugins.q.defer();
    let promiseArray = [];
    for (let keyArg in globStringObjectArg) {
        let cycleDone = plugins.q.defer();
        promiseArray.push(cycleDone.promise);
        plugins.beautylog.info(`TypeScript assignment: transpile from ${keyArg.blue} to ${globStringObjectArg[keyArg].blue}`);
        plugins.smartfile.fs.listFileTree(process.cwd(), keyArg)
            .then((filesToConvertArg) => {
            let absoluteFilePathArray = plugins.smartpath.transform.toAbsolute(filesToConvertArg, cwdArg);
            let destDir = plugins.smartpath.transform.toAbsolute(globStringObjectArg[keyArg], cwdArg);
            return exports.compileFileArray(absoluteFilePathArray, destDir, tsOptionsArg);
        }, (err) => {
            console.log(err);
        })
            .then(cycleDone.resolve).catch(err => { console.log(err); });
    }
    plugins.q.all(promiseArray).then(() => { done.resolve(); });
    return done.promise;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHNuLmNvbXBpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy90c24uY29tcGlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0JBQStCO0FBQy9CLHlDQUF3QztBQUV4Qyx5Q0FBc0U7QUFBNUMsb0NBQUEsWUFBWSxDQUFBO0FBQUUsa0NBQUEsVUFBVSxDQUFBO0FBRWxEOztHQUVHO0FBQ0gsSUFBSSxzQkFBc0IsR0FBb0I7SUFDMUMsV0FBVyxFQUFFLElBQUk7SUFDakIscUJBQXFCLEVBQUUsSUFBSTtJQUMzQixzQkFBc0IsRUFBRSxJQUFJO0lBQzVCLGVBQWUsRUFBRSxJQUFJO0lBQ3JCLGFBQWEsRUFBRSxLQUFLO0lBQ3BCLE1BQU0sRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxRQUFRO0lBQzlDLGFBQWEsRUFBRSxLQUFLO0lBQ3BCLE1BQU0sRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxHQUFHO0NBQzlDLENBQUE7QUFFRDs7R0FFRztBQUNILElBQUksb0JBQW9CLEdBQUcsVUFBVSxlQUFnQyxFQUFFLFNBQWlCO0lBQ3BGLHNEQUFzRDtJQUN0RCxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUFDLGVBQWUsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQUMsQ0FBQztJQUM5RyxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUFDLGVBQWUsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQUMsQ0FBQztJQUVoSCx5QkFBeUI7SUFDekIsSUFBSSxhQUFhLEdBQW9CLEVBQUUsQ0FBQSxDQUFDLGVBQWU7SUFDdkQsT0FBTyxDQUFDLE1BQU0sQ0FB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