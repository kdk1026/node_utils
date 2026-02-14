/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2026.02.15
 * @version 1.0
 */

const fs = require('node:fs');
const ini = require('ini');

const ExceptionMessage = {
    isNullOrEmpty: (paramName) => {
        return `${paramName} is null or empty`;
    }
};

/**
 * ini 파일 읽기
 * @param {string} filePath 
 * @returns 
 */
export const getIniObject = (filePath) => {
    if ( !filePath?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('filePath'));
    }

    try {
        const configFile = fs.readFileSync(filePath, 'utf-8');
        if ( configFile ) {
            return ini.parse(configFile);
        }

        return {};
    } catch (error) {
        console.error(error);
        return {};
    }
};

/**
 * ini 파일 읽기
 * @param {string} filePath 
 * @param {string} sectionName 
 * @param {string} key 
 * @returns 
 */
export const getIni = (filePath, sectionName, key) => {
    if ( !filePath?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('filePath'));
    }

    if ( !sectionName?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('sectionName'));
    }

    if ( !key?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('key'));
    }

    const config = getIniObject(filePath);

    return config[sectionName][key];
};

/**
 * ini 파일 읽기
 * @param {string} filePath 
 * @param {string} sectionName 
 * @returns 
 */
export const getIniSection = (filePath, sectionName) => {
    if ( !filePath?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('filePath'));
    }

    if ( !sectionName?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('sectionName'));
    }

    const config = getIniObject(filePath);

    return config[sectionName];
};

/**
 * ini 파일 읽기
 * @param {string} filePath 
 * @param {string} key 
 * @returns 
 */
export const getIniKey = (filePath, key) => {
    if ( !filePath?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('filePath'));
    }

    if ( !key?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('key'));
    }

    const config = getIniObject(filePath);

    let value = null;

    for (const sectionName in config) {
        const section = config[sectionName];

        if ( Object.hasOwn(section, key) ) {
            value = section[key];
        }
    }

    return value;
};

/**
 * ini 파일에 추가 및 기존 섹션, 키의 값 변경
 * @param {string} filePath 
 * @param {string} sectionName 
 * @param {string} key 
 * @param {string} value 
 */
export const addIni = (filePath, sectionName, key, value) => {
    if ( !filePath?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('filePath'));
    }

    if ( !sectionName?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('sectionName'));
    }

    if ( !key?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('key'));
    }

    if ( !value?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('value'));
    }

    const config = getIniObject(filePath);

    if ( !config[sectionName] ) {
        config[sectionName] = {};
    }

    config[sectionName][key] = value;

    const updatedConfig = ini.stringify(config);
    fs.writeFileSync(filePath, updatedConfig);
};

/**
 * ini 파일에서 섹션 전체 삭제
 * @param {string} filePath 
 * @param {string} sectionName 
 */
export const clearIniSection = (filePath, sectionName) => {
    if ( !filePath?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('filePath'));
    }

    if ( !sectionName?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('sectionName'));
    }
    
    const config = getIniObject(filePath);

    if ( config[sectionName] ) {
        delete config[sectionName];

        const updatedConfig = ini.stringify(config);
        fs.writeFileSync(filePath, updatedConfig);
    }
};

/**
 * ini 파일에서 특정 키 삭제
 * @param {string} filePath 
 * @param {string} sectionName 
 * @param {string} key 
 */
export const clearIniKey = (filePath, sectionName, key) => {
    if ( !filePath?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('filePath'));
    }

    if ( !sectionName?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('sectionName'));
    }

    if ( !key?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('key'));
    }
    
    const config = getIniObject(filePath);

    if ( config[sectionName] && Object.hasOwn(config[sectionName], key) ) {
        delete config[sectionName][key];

        const updatedConfig = ini.stringify(config);
        fs.writeFileSync(filePath, updatedConfig);
    }
};

