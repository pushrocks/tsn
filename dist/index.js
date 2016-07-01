"use strict";
// import all the stuff we need
var plugins = require("./tsn.plugins");
var compiler = function (fileNames, options) {
    var done = plugins.q.defer();
    var program = plugins.ts.createProgram(fileNames, options);
    var emitResult = program.emit();
    var allDiagnostics = plugins.ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);
    allDiagnostics.forEach(function (diagnostic) {
        var _a = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start), line = _a.line, character = _a.character;
        var message = plugins.ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
        console.log(diagnostic.file.fileName + " (" + (line + 1) + "," + (character + 1) + "): " + message);
    });
    var exitCode = emitResult.emitSkipped ? 1 : 0;
    if (exitCode == 0) {
        plugins.beautylog.ok("TypeScript emit succeeded!");
        done.resolve();
    }
    else {
        plugins.beautylog.error("TypeScript emit failed. Please investigate!");
        process.exit(exitCode);
    }
    return done.promise;
};
var compilerOptions = {
    declaration: true,
    inlineSourceMap: true,
    noEmitOnError: false,
    noImplicitAny: false,
    target: plugins.ts.ScriptTarget.ES5,
    module: plugins.ts.ModuleKind.CommonJS
};
exports.compile = function (filesArg, outDirArg) {
    var assignedOptions = {};
    assignedOptions = plugins.lodash.assign(assignedOptions, compilerOptions, { outDir: outDirArg }); // create final options
    plugins.beautylog.info("checking files before compilation");
    return compiler(filesArg, assignedOptions); // return the promise from compiler(); 
};
