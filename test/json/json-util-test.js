import { readJsonFile } from "../../json/json-util";

const data = readJsonFile('d:/test/test.json');
data.then(res => console.log(res));