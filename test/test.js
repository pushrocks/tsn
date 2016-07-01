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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVksU0FBUyxXQUFNLFdBQVcsQ0FBQyxDQUFBO0FBQ3ZDLElBQVksR0FBRyxXQUFNLGVBQWUsQ0FBQyxDQUFBO0FBRXJDLElBQUksVUFBVSxHQUFZO0lBQ3RCLDRCQUE0QjtJQUM1Qiw2QkFBNkI7Q0FDaEMsQ0FBQztBQUNGLElBQUksa0JBQWtCLEdBQVksU0FBUyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQzNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUNoQyxHQUFHLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLHNCQUFzQixFQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMifQ==