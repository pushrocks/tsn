// import all the stuff we need
import * as plugins from './tsn.plugins'
import {CompilerOptions} from 'typescript'
export {CompilerOptions,ScriptTarget,ModuleKind} from 'typescript'

let compiler = (fileNames: string[], options: plugins.typescript.CompilerOptions): void => {
    let done = plugins.q.defer()
    let program = plugins.typescript.createProgram(fileNames, options)
    let emitResult = program.emit()

    let allDiagnostics = plugins.typescript.getPreEmitDiagnostics(program).concat(emitResult.diagnostics)

    allDiagnostics.forEach((diagnostic) => {
        let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start)
        let message = plugins.typescript.flattenDiagnosticMessageText(diagnostic.messageText, '\n')
        console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`)
    })

    let exitCode = emitResult.emitSkipped ? 1 : 0
    if (exitCode === 0) {
        plugins.beautylog.ok('TypeScript emit succeeded!')
        done.resolve()
    } else {
        plugins.beautylog.error('TypeScript emit failed. Please investigate!')
        process.exit(exitCode)
    }
    return done.promise
}

let compilerOptionsDefault: CompilerOptions = {
    declaration: true,
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    inlineSourceMap: true,
    noEmitOnError: false,
    module: plugins.typescript.ModuleKind.CommonJS,
    noImplicitAny: false,
    target: plugins.typescript.ScriptTarget.ES6
}

export let compile = (filesArg: string[],outDirArg: string,compilerOptionsArg: CompilerOptions) => {
    let mergedOptions: CompilerOptions = {}
    mergedOptions = plugins.lodash.merge( // create final options
        mergedOptions,
        compilerOptionsDefault,
        compilerOptionsArg,
        {outDir: outDirArg}
    )
    plugins.beautylog.info('checking files before compilation')
    return compiler(filesArg,mergedOptions) // return the promise from compiler()
}
