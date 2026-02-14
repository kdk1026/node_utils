/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2026.02.15
 * @version 1.0
 */

const fs = require('node:fs').promises;

/**
 * JSON String을 Object로 변환
 * @param {string} jsonStr 
 * @returns 
 */
export const jsonToObject = (jsonStr) => {
    if ( typeof jsonStr !== 'string' || !jsonStr?.trim() ) {
        console.error("유효하지 않은 JSON 문자열:", jsonStr);  
        return null;
    }

    try {
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error("JSON 파싱 실패:", error);  
    }

    return null;
};

/**
 * Object를 JSON String으로 변환
 * @param {object} obj 
 * @returns 
 */
export const objectToJsonString = (obj) => {
    if ( !obj || typeof obj !== 'object' ) {
        console.error("유효하지 않은 객체:", obj);  
        return null;
    }

    try {
        return JSON.stringify(obj);
    } catch (error) {
        console.error("JSON 문자열 변환 실패:", error);  
    }

    return null;
};

/**
 * Object를 Tree 구조의 JSON String으로 변환
 * @param {object} obj 
 * @returns 
 */
export const objectToJsonStringPretty = (obj) => {
    if ( !obj || typeof obj !== 'object' ) {
        console.error("유효하지 않은 객체:", obj);  
        return null;
    }

    try {
        return JSON.stringify(obj, null, 2);
    } catch (error) {
        console.error("JSON 문자열 변환 실패:", error);  
    }

    return null;
};

/**
 * JSON 파일을 읽어서 Object로 변환
 * @param {string} filePath 
 * @returns 
 */
export const readJsonFile = async (filePath) => {
    if ( !filePath?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('filePath'));
    }

    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('파일 읽기 오류:', error);
        return null;
    }
};