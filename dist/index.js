"use strict";
// import all the stuff we need
const plugins = require('./tsn.plugins');
var typescript_1 = require('typescript');
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
exports.compile = (filesArg, outDirArg, compilerOptionsArg) => {
    let mergedOptions = {};
    mergedOptions = plugins.lodash.merge(// create final options
    mergedOptions, compilerOptionsDefault, compilerOptionsArg, { outDir: outDirArg });
    plugins.beautylog.info('checking files before compilation');
    return compiler(filesArg, mergedOptions); // return the promise from compiler()
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0JBQStCO0FBQy9CLE1BQVksT0FBTyxXQUFNLGVBQ3pCLENBQUMsQ0FEdUM7QUFFeEMsMkJBQXNELFlBRXRELENBQUM7QUFGdUIsaURBQVk7QUFBQyw2Q0FBNkI7QUFFbEUsSUFBSSxRQUFRLEdBQUcsQ0FBQyxTQUFtQixFQUFFLE9BQTJDO0lBQzVFLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDNUIsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQ2xFLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUUvQixJQUFJLGNBQWMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUE7SUFFckcsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVU7UUFDOUIsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN6RixJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLDRCQUE0QixDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDM0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksR0FBRyxDQUFDLElBQUksU0FBUyxHQUFHLENBQUMsTUFBTSxPQUFPLEVBQUUsQ0FBQyxDQUFBO0lBQ3pGLENBQUMsQ0FBQyxDQUFBO0lBRUYsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzdDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLDRCQUE0QixDQUFDLENBQUE7UUFDbEQsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ2xCLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLDZDQUE2QyxDQUFDLENBQUE7UUFDdEUsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUMxQixDQUFDO0lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7QUFDdkIsQ0FBQyxDQUFBO0FBRUQsSUFBSSxzQkFBc0IsR0FBb0I7SUFDMUMsV0FBVyxFQUFFLElBQUk7SUFDakIscUJBQXFCLEVBQUUsSUFBSTtJQUMzQixzQkFBc0IsRUFBRSxJQUFJO0lBQzVCLGVBQWUsRUFBRSxJQUFJO0lBQ3JCLGFBQWEsRUFBRSxLQUFLO0lBQ3BCLE1BQU0sRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxRQUFRO0lBQzlDLGFBQWEsRUFBRSxLQUFLO0lBQ3BCLE1BQU0sRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxHQUFHO0NBQzlDLENBQUE7QUFFVSxlQUFPLEdBQUcsQ0FBQyxRQUFrQixFQUFDLFNBQWlCLEVBQUMsa0JBQW1DO0lBQzFGLElBQUksYUFBYSxHQUFvQixFQUFFLENBQUE7SUFDdkMsYUFBYSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFFLHVCQUF1QjtJQUN6RCxhQUFhLEVBQ2Isc0JBQXNCLEVBQ3RCLGtCQUFrQixFQUNsQixFQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUMsQ0FDdEIsQ0FBQTtJQUNELE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLG1DQUFtQyxDQUFDLENBQUE7SUFDM0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUMsYUFBYSxDQUFDLENBQUEsQ0FBQyxxQ0FBcUM7QUFDakYsQ0FBQyxDQUFBIn0=