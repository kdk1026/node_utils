const bcrypt = require('bcrypt');

/** Bcrypt 해싱 */
const bcryptHash = async (originalText) => {
    if ( originalText === null || originalText.trim() === '' ) {
        throw new Error('원본 텍스트가 비어 있거나 null입니다. 해싱을 수행할 수 없습니다.');
    }

    const saltRounds = 16;
    const salt = await bcrypt.genSalt(saltRounds);

    return await bcrypt.hash(originalText, salt);
};

/** Bcrypt 해싱 검증 */
const checkBcryptHash = async (originalText, hashedText) => {
    if ( originalText === null || originalText.trim() === '' ) {
        throw new Error('원본 텍스트가 비어 있거나 null입니다. 해싱을 수행할 수 없습니다.');
    }

    if ( hashedText === null || hashedText.trim() === '' ) {
        throw new Error('해시된 텍스트가 비어 있거나 null입니다. 검증을 수행할 수 없습니다.');
    }

    return await bcrypt.compare(originalText, hashedText);
};

module.exports = {
    bcryptHash,
    checkBcryptHash
};