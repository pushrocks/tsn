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
    allDiagnostics.forEach((diagnostic) => {
        let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
        let message = plugins.typescript.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
        console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
    });
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