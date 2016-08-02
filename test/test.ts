import "typings-test";
import * as smartpath from "smartpath";
import * as tsn from "../dist/index";
import should = require("should");

let assetfiles:string[] = [
    "./test/assets/tocompile.ts",
    "./test/assets/tocompile2.ts"
];
let assetfilesAbsolute:string[] = smartpath.transform.toAbsolute(assetfiles,process.cwd());
console.log(assetfilesAbsolute);
tsn.compile(assetfilesAbsolute,smartpath.transform.toAbsolute("./test/assets/output",process.cwd()),{});
