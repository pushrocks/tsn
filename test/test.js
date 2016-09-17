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
            this.timeout(5000);
            tsn.compileFileArray(assetfiles, './test/assets/output');
        });
    });
    describe('compileFileArray', function () {
        it('should convert files from an array with single files to output', function () {
            this.timeout(5000);
            tsn.compileGlobStringObject(assetfiles2);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sY0FDUCxDQUFDLENBRG9CO0FBRXJCLE1BQVksR0FBRyxXQUFNLGVBQ3JCLENBQUMsQ0FEbUM7QUFHcEMsSUFBSSxVQUFVLEdBQWE7SUFDdkIsNEJBQTRCO0lBQzVCLDZCQUE2QjtDQUNoQyxDQUFBO0FBRUQsSUFBSSxXQUFXLEdBQUc7SUFDZCx1QkFBdUIsRUFBRSxzQkFBc0I7Q0FDbEQsQ0FBQTtBQUVELFFBQVEsQ0FBQyxLQUFLLEVBQUU7SUFDWixRQUFRLENBQUMsa0JBQWtCLEVBQUU7UUFDekIsRUFBRSxDQUFDLGdFQUFnRSxFQUFFO1lBQ2pFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDbEIsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxzQkFBc0IsQ0FBQyxDQUFBO1FBQzVELENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQyxDQUFDLENBQUE7SUFDRixRQUFRLENBQUMsa0JBQWtCLEVBQUU7UUFDekIsRUFBRSxDQUFDLGdFQUFnRSxFQUFFO1lBQ2pFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDbEIsR0FBRyxDQUFDLHVCQUF1QixDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQzVDLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDLENBQUMsQ0FBQSJ9