"use strict";
// import all the stuff we need
var plugins = require("./tsn.plugins");
var typescript_1 = require("typescript");
exports.ScriptTarget = typescript_1.ScriptTarget;
exports.ModuleKind = typescript_1.ModuleKind;
/**
 * the default typescript compilerOptions
 */
var compilerOptionsDefault = {
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
var mergeCompilerOptions = function (customTsOptions, outDirArg) {
    // convert strings for module kind etc. to enum values
    if (customTsOptions.module) {
        customTsOptions.module = plugins.typescript.ModuleKind[customTsOptions.module];
    }
    if (customTsOptions.target) {
        customTsOptions.target = plugins.typescript.ScriptTarget[customTsOptions.target];
    }
    // create merged options 
    var mergedOptions = {}; // create base 
    plugins.lodash.merge(// create final options
    mergedOptions, // things get merged into first object
    compilerOptionsDefault, customTsOptions, { outDir: outDirArg });
    return mergedOptions;
};
/**
 * the internal main compiler function that compiles the files
 */
var compiler = function (fileNames, options) {
    var done = plugins.q.defer();
    var program = plugins.typescript.createProgram(fileNames, options);
    var emitResult = program.emit();
    var allDiagnostics = plugins.typescript.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);
    try {
        allDiagnostics.forEach(function (diagnostic) {
            var _a = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start), line = _a.line, character = _a.character;
            var message = plugins.typescript.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
            console.log(diagnostic.file.fileName + " (" + (line + 1) + "," + (character + 1) + "): " + message);
        });
    }
    catch (err) {
        console.log(allDiagnostics);
    }
    var exitCode = emitResult.emitSkipped ? 1 : 0;
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
exports.compileFileArray = function (fileStringArrayArg, destDir, compilerOptionsArg) {
    if (compilerOptionsArg === void 0) { compilerOptionsArg = {}; }
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
exports.compileGlobStringObject = function (globStringObjectArg, tsOptionsArg, cwdArg) {
    if (tsOptionsArg === void 0) { tsOptionsArg = {}; }
    if (cwdArg === void 0) { cwdArg = process.cwd(); }
    var done = plugins.q.defer();
    var promiseArray = [];
    var _loop_1 = function (keyArg) {
        var cycleDone = plugins.q.defer();
        promiseArray.push(cycleDone.promise);
        plugins.beautylog.info("TypeScript assignment: transpile from " + keyArg.blue + " to " + globStringObjectArg[keyArg].blue);
        plugins.smartfile.fs.listFileTree(cwdArg, keyArg)
            .then(function (filesToConvertArg) {
            var absoluteFilePathArray = plugins.smartpath.transform.toAbsolute(filesToConvertArg, cwdArg);
            var destDir = plugins.smartpath.transform.toAbsolute(globStringObjectArg[keyArg], cwdArg);
            return exports.compileFileArray(absoluteFilePathArray, destDir, tsOptionsArg);
        }, function (err) {
            console.log(err);
        })
            .then(cycleDone.resolve)["catch"](function (err) { console.log(err); });
    };
    for (var keyArg in globStringObjectArg) {
        _loop_1(keyArg);
    }
    plugins.q.all(promiseArray).then(function () { done.resolve(); });
    return done.promise;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHNuLmNvbXBpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy90c24uY29tcGlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0JBQStCO0FBQy9CLHVDQUF3QztBQUV4Qyx5Q0FBc0U7QUFBNUMsb0NBQUEsWUFBWSxDQUFBO0FBQUUsa0NBQUEsVUFBVSxDQUFBO0FBRWxEOztHQUVHO0FBQ0gsSUFBSSxzQkFBc0IsR0FBb0I7SUFDMUMsV0FBVyxFQUFFLElBQUk7SUFDakIscUJBQXFCLEVBQUUsSUFBSTtJQUMzQixzQkFBc0IsRUFBRSxJQUFJO0lBQzVCLGVBQWUsRUFBRSxJQUFJO0lBQ3JCLGFBQWEsRUFBRSxLQUFLO0lBQ3BCLE1BQU0sRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxRQUFRO0lBQzlDLGFBQWEsRUFBRSxLQUFLO0lBQ3BCLE1BQU0sRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxHQUFHO0NBQzlDLENBQUE7QUFFRDs7R0FFRztBQUNILElBQUksb0JBQW9CLEdBQUcsVUFBVSxlQUFnQyxFQUFFLFNBQWlCO0lBQ3BGLHNEQUFzRDtJQUN0RCxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUFDLGVBQWUsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQUMsQ0FBQztJQUM5RyxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUFDLGVBQWUsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQUMsQ0FBQztJQUVoSCx5QkFBeUI7SUFDekIsSUFBSSxhQUFhLEdBQW9CLEVBQUUsQ0FBQSxDQUFDLGVBQWU7SUFDdkQsT0FBTyxDQUFDLE1BQU0sQ0FB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