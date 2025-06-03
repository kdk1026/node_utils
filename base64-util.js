/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.06.03
 * @version 1.0
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