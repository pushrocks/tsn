"use strict";
require('typings-test');
const smartpath = require('smartpath');
const tsn = require('../dist/index');
let assetfiles = [
    './test/assets/tocompile.ts',
    './test/assets/tocompile2.ts'
];
let assetfilesAbsolute = smartpath.transform.toAbsolute(assetfiles, process.cwd());
console.log(assetfilesAbsolute);
tsn.compile(assetfilesAbsolute, smartpath.transform.toAbsolute('./test/assets/output', process.cwd()), {});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sY0FDUCxDQUFDLENBRG9CO0FBQ3JCLE1BQVksU0FBUyxXQUFNLFdBQzNCLENBQUMsQ0FEcUM7QUFDdEMsTUFBWSxHQUFHLFdBQU0sZUFDckIsQ0FBQyxDQURtQztBQUdwQyxJQUFJLFVBQVUsR0FBYTtJQUN2Qiw0QkFBNEI7SUFDNUIsNkJBQTZCO0NBQ2hDLENBQUE7QUFDRCxJQUFJLGtCQUFrQixHQUFhLFNBQVMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQTtBQUMzRixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUE7QUFDL0IsR0FBRyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsRUFBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQSJ9