"use strict";
// import all the stuff we need
const plugins = require('./tsn.plugins');
var typescript_1 = require('typescript');
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
exports.compileGlobStringObject = (globStringArrayArg, tsOptionsArg = {}, cwdArg = process.cwd()) => {
    let done = plugins.q.defer();
    let promiseArray = [];
    for (let keyArg in globStringArrayArg) {
        let cycleDone = plugins.q.defer();
        promiseArray.push(cycleDone.promise);
        plugins.beautylog.info(`TypeScript assignment: transpile from ${keyArg.blue} to ${globStringArrayArg[keyArg].blue}`);
        plugins.smartfile.fs.listFileTree(process.cwd(), keyArg)
            .then((filesToConvertArg) => {
            let absoluteFilePathArray = plugins.smartpath.transform.toAbsolute(filesToConvertArg, cwdArg);
            let destDir = plugins.smartpath.transform.toAbsolute(globStringArrayArg[keyArg], cwdArg);
            return exports.compileFileArray(absoluteFilePathArray, destDir, tsOptionsArg);
        }, (err) => {
            console.log(err);
        })
            .then(cycleDone.resolve);
    }
    plugins.q.all(promiseArray).then(() => { done.resolve(); });
    return done.promise;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHNuLmNvbXBpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy90c24uY29tcGlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0JBQStCO0FBQy9CLE1BQVksT0FBTyxXQUFNLGVBQ3pCLENBQUMsQ0FEdUM7QUFFeEMsMkJBQTBELFlBSzFELENBQUM7QUFMeUIsaURBQVk7QUFBRSw2Q0FBOEI7QUFFdEU7O0dBRUc7QUFDSCxJQUFJLHNCQUFzQixHQUFvQjtJQUMxQyxXQUFXLEVBQUUsSUFBSTtJQUNqQixxQkFBcUIsRUFBRSxJQUFJO0lBQzNCLHNCQUFzQixFQUFFLElBQUk7SUFDNUIsZUFBZSxFQUFFLElBQUk7SUFDckIsYUFBYSxFQUFFLEtBQUs7SUFDcEIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLFFBQVE7SUFDOUMsYUFBYSxFQUFFLEtBQUs7SUFDcEIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEdBQUc7Q0FDOUMsQ0FBQTtBQUVEOztHQUVHO0FBQ0gsSUFBSSxvQkFBb0IsR0FBRyxVQUFVLGVBQWdDLEVBQUUsU0FBaUI7SUFDcEYsc0RBQXNEO0lBQ3RELEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUE7SUFBQyxDQUFDO0lBQzlHLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUE7SUFBQyxDQUFDO0lBRWhILHlCQUF5QjtJQUN6QixJQUFJLGFBQWEsR0FBb0IsRUFBRSxDQUFBLENBQUMsZUFBZTtJQUN2RCxP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