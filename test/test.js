"use strict";
require('typings-test');
const tsn = require('../dist/index');
let assetfiles = [
    './test/assets/tocompile.ts',
    './test/assets/tocompile2.ts'
];
let assetfiles2 = {
    './test/assets/**/*.ts': './test/assets/output'
};
describe('tsn', function () {
    describe('compileFileArray', function () {
        it('should convert files from an array with single files to output', function () {
            tsn.compileFileArray(assetfiles, './test/assets/output');
        });
    });
    describe('compileFileArray', function () {
        it('should convert files from an array with single files to output', function () {
            tsn.compileGlobStringObject(assetfiles2);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sY0FDUCxDQUFDLENBRG9CO0FBRXJCLE1BQVksR0FBRyxXQUFNLGVBQ3JCLENBQUMsQ0FEbUM7QUFHcEMsSUFBSSxVQUFVLEdBQWE7SUFDdkIsNEJBQTRCO0lBQzVCLDZCQUE2QjtDQUNoQyxDQUFBO0FBRUQsSUFBSSxXQUFXLEdBQUc7SUFDZCx1QkFBdUIsRUFBRSxzQkFBc0I7Q0FDbEQsQ0FBQTtBQUVELFFBQVEsQ0FBQyxLQUFLLEVBQUU7SUFDWixRQUFRLENBQUMsa0JBQWtCLEVBQUU7UUFDekIsRUFBRSxDQUFDLGdFQUFnRSxFQUFFO1lBQ2pFLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsc0JBQXNCLENBQUMsQ0FBQTtRQUM1RCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUMsQ0FBQyxDQUFBO0lBQ0YsUUFBUSxDQUFDLGtCQUFrQixFQUFFO1FBQ3pCLEVBQUUsQ0FBQyxnRUFBZ0UsRUFBRTtZQUNqRSxHQUFHLENBQUMsdUJBQXVCLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDNUMsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQyxDQUFBIn0=