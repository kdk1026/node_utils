import { addIni, clearIniKey, clearIniSection, getIni, getIniKey, getIniObject, getIniSection } from "../../ini/ini-util";

const obj = getIniObject('d:/test/config.ini');
console.log(obj);

const host = getIni('d:/test/config.ini', 'Server', 'host');
console.log(host);

const server = getIniSection('d:/test/config.ini', 'Server');
console.log(server);

const port = getIniKey('d:/test/config.ini', 'port');
console.log(port);

addIni('d:/test/config.ini', 'Test', 'name', '홍길동');
addIni('d:/test/config.ini', 'Test', 'age', '30');

clearIniSection('d:/test/config.ini', 'Test');
clearIniKey('d:/test/config.ini', 'Test2', 'age');