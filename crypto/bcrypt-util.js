/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.06.03
 * @version 1.0
 * @description 2026.02.14 수정
 */

const bcrypt = require('bcrypt');

/**
 * Bcrypt 해싱
 * @param {string} originalText 
 * @returns 
 */
export const bcryptHash = async (originalText) => {
    if ( !originalText?.trim() ) {
        throw new Error('원본 텍스트가 비어 있거나 null입니다. 해싱을 수행할 수 없습니다.');
    }

    const saltRounds = 10;

    return await bcrypt.hash(originalText, saltRounds);
};

/**
 * Bcrypt 해싱 검증
 * @param {string} originalText 
 * @param {string} hashedText 
 * @returns 
 */
export const checkBcryptHash = async (originalText, hashedText) => {
    if ( !originalText?.trim() ) {
        throw new Error('원본 텍스트가 비어 있거나 null입니다. 해싱을 수행할 수 없습니다.');
    }

    if ( !hashedText?.trim() ) {
        throw new Error('해시된 텍스트가 비어 있거나 null입니다. 검증을 수행할 수 없습니다.');
    }

    return await bcrypt.compare(originalText, hashedText);
};