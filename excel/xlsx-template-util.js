const fs = require('node:fs');
const XlsxTemplate = require('xlsx-template');

const ExceptionMessage = {
    isNullOrEmpty: (paramName) => {
        return `${paramName} is null or empty`;
    }
};

/**
 * 템플릿 파일 이용해서 엑셀 파일 생성
 * @param {string} templateFilePath 
 * @param {string} destFilePath 
 * @param {object} dataObj
 * @example
 *   일반 변수: ${customerName}
 *   리스트 변수:
 *      ${table:items.productName}
 *      ${table:items.amount}
 */
export const writeExcel = async (templateFilePath, destFilePath, dataObj) => {
    if ( !templateFilePath?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('templateFilePath'));
    }

    if ( !destFilePath?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('destFilePath'));
    }

    if ( !dataObj || dataObj.length <= 0 ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('dataObj'));
    }

    const data = fs.readFileSync(templateFilePath);

    const template = new XlsxTemplate(data);
    const sheetNumber = 1;
    
    template.substitute(sheetNumber, dataObj);

    const result = template.generate({ type: 'nodebuffer' });
    fs.writeFileSync(destFilePath, result);
}