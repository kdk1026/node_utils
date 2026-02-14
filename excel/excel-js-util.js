const ExcelJS = require('exceljs');

const ExceptionMessage = {
    isNullOrEmpty: (paramName) => {
        return `${paramName} is null or empty`;
    },

    isNegative: (paramName) => {
        return `${paramName} is negative`;
    }
};

/**
 * 엑셀 파일 읽기
 * @param {string} filePath 
 * @param {null|string[]} customKeys
 * @param {number} startRow 
 * @returns 
 */
export const readExcel = async (filePath, customKeys, startRow) => {
    if ( !filePath?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('filePath'));
    }

    if ( startRow <= 0 ) {
        throw new Error(ExceptionMessage.isNegative('startRow'));
    }

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet(1);
    const list = [];

    if ( customKeys ) {
        worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
            if (rowNumber <= startRow) return;

            const rowObject = {};

            customKeys.forEach((key, index) => {
                const colNumber = index + 1;
                const cell = row.getCell(colNumber);
    
                rowObject[key] = (cell.value && cell.value.result !== undefined) 
                    ? cell.value.result 
                    : cell.value;
            });
    
            list.push(rowObject);
        });
    } else {
        const headerRow = worksheet.getRow(startRow);
        const keys = [];
        headerRow.eachCell((cell, colNumber) => {
            keys[colNumber] = cell.value;
        });

        worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
            if (rowNumber <= startRow) return;

            const rowObject = {};
            row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                const key = keys[colNumber];
                if (key) {
                    rowObject[key] = cell.result === undefined ? cell.value : cell.result;
                }
            });

            list.push(rowObject);
        });
    }

    return list;
};

/**
 * 엑셀 파일 생성
 * @param {string} destFilePath 
 * @param {object[]} contentsList 
 * @param {string[]} cellTitles 
 * @param {string[]} contentsKeys 
 */
export const writeExcel = async (destFilePath, contentsList, cellTitles, contentsKeys) => {
    if ( !destFilePath?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('destFilePath'));
    }

    if ( !contentsList?.length ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('contentsList'));
    }

    if ( !cellTitles?.length ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('cellTitles'));
    }

    if ( !contentsKeys?.length ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('contentsKeys'));
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    worksheet.columns = cellTitles.map((title, index) => ({
        header: title,
        key: contentsKeys[index],
        width: 15
    }));

    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFEEEEEE' }
    };

    worksheet.addRows(contentsList);

    try {
        await workbook.xlsx.writeFile(destFilePath);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};