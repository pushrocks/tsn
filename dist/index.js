"use strict";
// import all the stuff we need
const plugins = require("./tsn.plugins");
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
let compilerOptions = {
    declaration: true,
    inlineSourceMap: true,
    noEmitOnError: false,
    noImplicitAny: false,
    target: plugins.typescript.ScriptTarget.ES6,
    module: plugins.typescript.ModuleKind.CommonJS
};
exports.compile = (filesArg, outDirArg, compilerOptions) => {
    let assignedOptions = {};
    assignedOptions = plugins.lodash.assign(assignedOptions, compilerOptions, { outDir: outDirArg }); // create final options
    plugins.beautylog.info("checking files before compilation");
    return compiler(filesArg, assignedOptions); // return the promise from compiler(); 
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0JBQStCO0FBQy9CLE1BQVksT0FBTyxXQUFNLGVBQWUsQ0FBQyxDQUFBO0FBSXpDLElBQUksUUFBUSxHQUFHLENBQUMsU0FBbUIsRUFBRSxPQUEyQztJQUM1RSxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNuRSxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFaEMsSUFBSSxjQUFjLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRXRHLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVO1FBQzlCLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUYsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyw0QkFBNEIsQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVGLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLEdBQUcsQ0FBQyxJQUFJLFNBQVMsR0FBRyxDQUFDLE1BQU0sT0FBTyxFQUFFLENBQUMsQ0FBQztJQUMxRixDQUFDLENBQUMsQ0FBQztJQUVILElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5QyxFQUFFLENBQUEsQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQztRQUNkLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7UUFDdkUsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDeEIsQ0FBQyxDQUFBO0FBRUQsSUFBSSxlQUFlLEdBQW1CO0lBQ2xDLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLGVBQWUsRUFBRSxJQUFJO0lBQ3JCLGFBQWEsRUFBRSxLQUFLO0lBQ3BCLGFBQWEsRUFBRSxLQUFLO0lBQ3BCLE1BQU0sRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxHQUFHO0lBQzNDLE1BQU0sRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxRQUFRO0NBQ2pELENBQUM7QUFFUyxlQUFPLEdBQUcsQ0FBQyxRQUFpQixFQUFDLFNBQWdCLEVBQUMsZUFBK0I7SUFDcEYsSUFBSSxlQUFlLEdBQW1CLEVBQUUsQ0FBQztJQUN6QyxlQUFlLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFDLGVBQWUsRUFBQyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsQ0FBQyxDQUFDLENBQUMsdUJBQXVCO0lBQ3BILE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLG1DQUFtQyxDQUFDLENBQUM7SUFDNUQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyx1Q0FBdUM7QUFDdEYsQ0FBQyxDQUFBIn0=