"use strict";
var smartpath = require("smartpath");
var tsn = require("../dist/index");
var assetfiles = [
    "./test/assets/tocompile.ts",
    "./test/assets/tocompile2.ts"
];
var assetfilesAbsolute = smartpath.transform.toAbsolute(assetfiles, process.cwd());
console.log(assetfilesAbsolute);
tsn.compile(assetfilesAbsolute, smartpath.transform.toAbsolute("./test/assets/output", process.cwd()));
