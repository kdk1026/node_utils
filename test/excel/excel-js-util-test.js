import { readExcel, writeExcel } from "../../excel/excel-js-util";

const customKeys = null;

readExcel('d:/test/테스트.xlsx', customKeys, 3)
.then(data => console.log(data));

const destFilePath = 'd:/test/생성 테스트.xlsx';

const contentsList = [];

let content;

content = {
    'Name': '홍길동',
    'Age': 30
};
contentsList.push(content);

content = {
    'Name': '장발장',
    'Age': 20
};
contentsList.push(content);

content = {
    'Name': '잉꺽정',
    'Age': 40
};
contentsList.push(content);

const cellTitles = ['이름', '나이'];
const contentsKeys = ['Name', 'Age'];

writeExcel(destFilePath, contentsList, cellTitles, contentsKeys)
.then(result => console.log(result));