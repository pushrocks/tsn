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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0JBQStCO0FBQy9CLElBQVksT0FBTyxXQUFNLGVBQWUsQ0FBQyxDQUFBO0FBRXpDLElBQUksUUFBUSxHQUFHLFVBQUMsU0FBbUIsRUFBRSxPQUFtQztJQUNwRSxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMzRCxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFaEMsSUFBSSxjQUFjLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRTlGLGNBQWMsQ0FBQyxPQUFPLENBQUMsVUFBQyxVQUFVO1FBQzlCLElBQUEsb0VBQXlGLEVBQW5GLGNBQUksRUFBRSx3QkFBUyxDQUFxRTtRQUMxRixJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDLDRCQUE0QixDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEYsT0FBTyxDQUFDLEdBQUcsQ0FBSSxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsV0FBSyxJQUFJLEdBQUcsQ0FBQyxXQUFJLFNBQVMsR0FBRyxDQUFDLFlBQU0sT0FBUyxDQUFDLENBQUM7SUFDMUYsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsV0FBVyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDOUMsRUFBRSxDQUFBLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7UUFDZCxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO1FBQ3ZFLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ3hCLENBQUMsQ0FBQTtBQUVELElBQUksZUFBZSxHQUE4QjtJQUM3QyxXQUFXLEVBQUUsSUFBSTtJQUNqQixlQUFlLEVBQUUsSUFBSTtJQUNyQixhQUFhLEVBQUUsS0FBSztJQUNwQixhQUFhLEVBQUUsS0FBSztJQUNwQixNQUFNLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsR0FBRztJQUNuQyxNQUFNLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUTtDQUN6QyxDQUFDO0FBRVMsZUFBTyxHQUFHLFVBQUMsUUFBaUIsRUFBQyxTQUFnQjtJQUNwRCxJQUFJLGVBQWUsR0FBOEIsRUFBRSxDQUFDO0lBQ3BELGVBQWUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUMsZUFBZSxFQUFDLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxDQUFDLENBQUMsQ0FBQyx1QkFBdUI7SUFDcEgsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsbUNBQW1DLENBQUMsQ0FBQztJQUM1RCxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLHVDQUF1QztBQUN0RixDQUFDLENBQUEifQ==