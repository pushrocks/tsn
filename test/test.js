"use strict";
require("typings-test");
const smartpath = require("smartpath");
const tsn = require("../dist/index");
let assetfiles = [
    "./test/assets/tocompile.ts",
    "./test/assets/tocompile2.ts"
];
let assetfilesAbsolute = smartpath.transform.toAbsolute(assetfiles, process.cwd());
console.log(assetfilesAbsolute);
tsn.compile(assetfilesAbsolute, smartpath.transform.toAbsolute("./test/assets/output", process.cwd()), {});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sY0FBYyxDQUFDLENBQUE7QUFDdEIsTUFBWSxTQUFTLFdBQU0sV0FBVyxDQUFDLENBQUE7QUFDdkMsTUFBWSxHQUFHLFdBQU0sZUFBZSxDQUFDLENBQUE7QUFHckMsSUFBSSxVQUFVLEdBQVk7SUFDdEIsNEJBQTRCO0lBQzVCLDZCQUE2QjtDQUNoQyxDQUFDO0FBQ0YsSUFBSSxrQkFBa0IsR0FBWSxTQUFTLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFDM0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ2hDLEdBQUcsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsc0JBQXNCLEVBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMifQ==