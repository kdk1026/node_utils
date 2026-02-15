/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.06.03
 * @version 1.0
 * @description 2026.02.15 URL 인코딩 추가
 */

/**
 * Base64 인코딩
 * @param {string} str
 * @param {undefined|string} charset
 * @returns 
 */
export const encodeBase64 = (str, charset = 'utf8') => {
    if ( typeof str !== 'string' || !str?.trim() ) {
        return '';
    }

    return Buffer.from(str, charset).toString('base64');
};

/**
 * Base64 디코딩
 * @param {string} str
 * @param {undefined|string} charset
 * @returns 
 */
export const decodeBase64 = (str, charset = 'utf8') => {
    if ( typeof str !== 'string' || !str?.trim() ) {
        return '';
    }

    return Buffer.from(str, 'base64').toString(charset);        
};

/**
 * URL 인코딩 - 파라미터 전용
 * @param {string} str 
 * @returns 
 */
export const urlEncodeParameter = (str) => {
    if ( typeof str !== 'string' || !str?.trim() ) {
        return '';
    }
    
    return encodeURIComponent(str);
};

/**
 * URL 디코딩 - 파라미터 전용
 * @param {string} str 
 * @returns 
 */
export const urlDecodeParameter = (str) => {
    if ( typeof str !== 'string' || !str?.trim() ) {
        return '';
    }
    
    return decodeURIComponent(str);
};

/**
 * URL 인코딩 - 전체 URL
 * @param {string} str 
 * @returns 
 */
export const urlEncodeAll = (str) => {
    if ( typeof str !== 'string' || !str?.trim() ) {
        return '';
    }

    return encodeURI(str);
};

/**
 * URL 디코딩 - 전체 URL
 * @param {string} str 
 * @returns 
 */
export const urlDecodeAll = (str) => {
    if ( typeof str !== 'string' || !str?.trim() ) {
        return '';
    }

    return decodeURI(str);
};