"use strict";
require("typings-global");
var plugins = require("./tsn.plugins");
var compiler = function (fileNames, options) {
    var program = plugins.ts.createProgram(fileNames, options);
    var emitResult = program.emit();
    var allDiagnostics = plugins.ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);
    allDiagnostics.forEach(function (diagnostic) {
        var _a = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start), line = _a.line, character = _a.character;
        var message = plugins.ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
        console.log(diagnostic.file.fileName + " (" + (line + 1) + "," + (character + 1) + "): " + message);
    });
    var exitCode = emitResult.emitSkipped ? 1 : 0;
    console.log("Process exiting with code '" + exitCode + "'.");
    process.exit(exitCode);
};
var compilerOptions = {
    declaration: true,
    inlineSourceMap: true,
    noEmitOnError: true,
    noImplicitAny: true,
    target: plugins.ts.ScriptTarget.ES5,
    module: plugins.ts.ModuleKind.CommonJS
};
exports.compile = function (filesArg, outDirArg) {
    var assignedOptions = {};
    assignedOptions = plugins.lodash.assign(assignedOptions, compiler, { outDir: outDirArg });
    compiler(filesArg, assignedOptions);
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxRQUFPLGdCQUFnQixDQUFDLENBQUE7QUFDeEIsSUFBWSxPQUFPLFdBQU0sZUFBZSxDQUFDLENBQUE7QUFFekMsSUFBSSxRQUFRLEdBQUcsVUFBQyxTQUFtQixFQUFFLE9BQW1DO0lBQ3BFLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMzRCxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFaEMsSUFBSSxjQUFjLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRTlGLGNBQWMsQ0FBQyxPQUFPLENBQUMsVUFBQyxVQUFVO1FBQzlCLElBQUEsb0VBQXlGLEVBQW5GLGNBQUksRUFBRSx3QkFBUyxDQUFxRTtRQUMxRixJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDLDRCQUE0QixDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEYsT0FBTyxDQUFDLEdBQUcsQ0FBSSxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsV0FBSyxJQUFJLEdBQUcsQ0FBQyxXQUFJLFNBQVMsR0FBRyxDQUFDLFlBQU0sT0FBUyxDQUFDLENBQUM7SUFDMUYsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsV0FBVyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBOEIsUUFBUSxPQUFJLENBQUMsQ0FBQztJQUN4RCxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzNCLENBQUMsQ0FBQTtBQUVELElBQUksZUFBZSxHQUE4QjtJQUM3QyxXQUFXLEVBQUUsSUFBSTtJQUNqQixlQUFlLEVBQUUsSUFBSTtJQUNyQixhQUFhLEVBQUUsSUFBSTtJQUNuQixhQUFhLEVBQUUsSUFBSTtJQUNuQixNQUFNLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsR0FBRztJQUNuQyxNQUFNLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUTtDQUN6QyxDQUFDO0FBRVMsZUFBTyxHQUFHLFVBQUMsUUFBaUIsRUFBQyxTQUFnQjtJQUNwRCxJQUFJLGVBQWUsR0FBOEIsRUFBRSxDQUFDO0lBQ3BELGVBQWUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUMsUUFBUSxFQUFDLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxDQUFDLENBQUM7SUFDckYsUUFBUSxDQUFDLFFBQVEsRUFBQyxlQUFlLENBQUMsQ0FBQztBQUN2QyxDQUFDLENBQUEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCJ0eXBpbmdzLWdsb2JhbFwiO1xuaW1wb3J0ICogYXMgcGx1Z2lucyBmcm9tIFwiLi90c24ucGx1Z2luc1wiO1xuXG5sZXQgY29tcGlsZXIgPSAoZmlsZU5hbWVzOiBzdHJpbmdbXSwgb3B0aW9uczogcGx1Z2lucy50cy5Db21waWxlck9wdGlvbnMpOiB2b2lkID0+IHtcbiAgICBsZXQgcHJvZ3JhbSA9IHBsdWdpbnMudHMuY3JlYXRlUHJvZ3JhbShmaWxlTmFtZXMsIG9wdGlvbnMpO1xuICAgIGxldCBlbWl0UmVzdWx0ID0gcHJvZ3JhbS5lbWl0KCk7XG5cbiAgICBsZXQgYWxsRGlhZ25vc3RpY3MgPSBwbHVnaW5zLnRzLmdldFByZUVtaXREaWFnbm9zdGljcyhwcm9ncmFtKS5jb25jYXQoZW1pdFJlc3VsdC5kaWFnbm9zdGljcyk7XG5cbiAgICBhbGxEaWFnbm9zdGljcy5mb3JFYWNoKChkaWFnbm9zdGljKSA9PiB7XG4gICAgICAgIGxldCB7IGxpbmUsIGNoYXJhY3RlciB9ID0gZGlhZ25vc3RpYy5maWxlLmdldExpbmVBbmRDaGFyYWN0ZXJPZlBvc2l0aW9uKGRpYWdub3N0aWMuc3RhcnQpO1xuICAgICAgICBsZXQgbWVzc2FnZSA9IHBsdWdpbnMudHMuZmxhdHRlbkRpYWdub3N0aWNNZXNzYWdlVGV4dChkaWFnbm9zdGljLm1lc3NhZ2VUZXh0LCAnXFxuJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGAke2RpYWdub3N0aWMuZmlsZS5maWxlTmFtZX0gKCR7bGluZSArIDF9LCR7Y2hhcmFjdGVyICsgMX0pOiAke21lc3NhZ2V9YCk7XG4gICAgfSk7XG5cbiAgICBsZXQgZXhpdENvZGUgPSBlbWl0UmVzdWx0LmVtaXRTa2lwcGVkID8gMSA6IDA7XG4gICAgY29uc29sZS5sb2coYFByb2Nlc3MgZXhpdGluZyB3aXRoIGNvZGUgJyR7ZXhpdENvZGV9Jy5gKTtcbiAgICBwcm9jZXNzLmV4aXQoZXhpdENvZGUpO1xufVxuXG5sZXQgY29tcGlsZXJPcHRpb25zOnBsdWdpbnMudHMuQ29tcGlsZXJPcHRpb25zID0ge1xuICAgIGRlY2xhcmF0aW9uOiB0cnVlLFxuICAgIGlubGluZVNvdXJjZU1hcDogdHJ1ZSxcbiAgICBub0VtaXRPbkVycm9yOiB0cnVlLFxuICAgIG5vSW1wbGljaXRBbnk6IHRydWUsXG4gICAgdGFyZ2V0OiBwbHVnaW5zLnRzLlNjcmlwdFRhcmdldC5FUzUsXG4gICAgbW9kdWxlOiBwbHVnaW5zLnRzLk1vZHVsZUtpbmQuQ29tbW9uSlNcbn07XG5cbmV4cG9ydCBsZXQgY29tcGlsZSA9IChmaWxlc0FyZzpzdHJpbmdbXSxvdXREaXJBcmc6c3RyaW5nKSA9PiB7XG4gICAgbGV0IGFzc2lnbmVkT3B0aW9uczpwbHVnaW5zLnRzLkNvbXBpbGVyT3B0aW9ucyA9IHt9O1xuICAgIGFzc2lnbmVkT3B0aW9ucyA9IHBsdWdpbnMubG9kYXNoLmFzc2lnbihhc3NpZ25lZE9wdGlvbnMsY29tcGlsZXIse291dERpcjpvdXREaXJBcmd9KTtcbiAgICBjb21waWxlcihmaWxlc0FyZyxhc3NpZ25lZE9wdGlvbnMpO1xufSJdfQ==
