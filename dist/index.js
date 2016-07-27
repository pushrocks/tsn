"use strict";
// import all the stuff we need
const plugins = require("./tsn.plugins");
var typescript_1 = require("typescript");
exports.ScriptTarget = typescript_1.ScriptTarget;
exports.ModuleKind = typescript_1.ModuleKind;
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
let compilerOptionsDefault = {
    declaration: true,
    inlineSourceMap: true,
    noEmitOnError: false,
    noImplicitAny: false,
    target: plugins.typescript.ScriptTarget.ES6,
    module: plugins.typescript.ModuleKind.CommonJS
};
exports.compile = (filesArg, outDirArg, compilerOptionsArg) => {
    let mergedOptions = {};
    mergedOptions = plugins.lodash.merge(mergedOptions, compilerOptionsDefault, compilerOptionsArg, { outDir: outDirArg }); // create final options
    plugins.beautylog.info("checking files before compilation");
    return compiler(filesArg, mergedOptions); // return the promise from compiler(); 
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0JBQStCO0FBQy9CLE1BQVksT0FBTyxXQUFNLGVBQWUsQ0FBQyxDQUFBO0FBRXpDLDJCQUFzRCxZQUFZLENBQUM7QUFBM0MsaURBQVk7QUFBQyw2Q0FBOEI7QUFFbkUsSUFBSSxRQUFRLEdBQUcsQ0FBQyxTQUFtQixFQUFFLE9BQTJDO0lBQzVFLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDN0IsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ25FLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUVoQyxJQUFJLGNBQWMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFdEcsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVU7UUFDOUIsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxRixJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLDRCQUE0QixDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDNUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksR0FBRyxDQUFDLElBQUksU0FBUyxHQUFHLENBQUMsTUFBTSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQzFGLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlDLEVBQUUsQ0FBQSxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO1FBQ2QsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ0osT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsNkNBQTZDLENBQUMsQ0FBQztRQUN2RSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUN4QixDQUFDLENBQUE7QUFFRCxJQUFJLHNCQUFzQixHQUFtQjtJQUN6QyxXQUFXLEVBQUUsSUFBSTtJQUNqQixlQUFlLEVBQUUsSUFBSTtJQUNyQixhQUFhLEVBQUUsS0FBSztJQUNwQixhQUFhLEVBQUUsS0FBSztJQUNwQixNQUFNLEVBQUUsT0FBTyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsR0FBRztJQUMzQyxNQUFNLEVBQUUsT0FBTyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsUUFBUTtDQUNqRCxDQUFDO0FBRVMsZUFBTyxHQUFHLENBQUMsUUFBaUIsRUFBQyxTQUFnQixFQUFDLGtCQUFrQztJQUN2RixJQUFJLGFBQWEsR0FBbUIsRUFBRSxDQUFDO0lBQ3ZDLGFBQWEsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUMsc0JBQXNCLEVBQUMsa0JBQWtCLEVBQUMsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLENBQUMsQ0FBQyxDQUFDLHVCQUF1QjtJQUN6SSxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0lBQzVELE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsdUNBQXVDO0FBQ3BGLENBQUMsQ0FBQSJ9