import { writeExcel } from "../../excel/xlsx-template-util";

const dataObj = {};
dataObj.customerName = '홍길동'

const list = [];
let obj;

obj = {
    'productName': '노트북',
    'amount': 1500
};
list.push(obj);

obj = {
    'productName': '마우스',
    'amount': 50
};
list.push(obj);

obj = {
    'productName': '키보드',
    'amount': 100
};
list.push(obj);

dataObj.items = list;

const templateFilePath = 'd:/test/node/xlsxTemplate.xlsx';
const destFilePath = 'd:/test/node/생성 테스트.xlsx';

writeExcel(templateFilePath, destFilePath, dataObj);