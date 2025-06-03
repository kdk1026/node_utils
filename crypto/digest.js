/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2021.05.12
 * @version 1.0
 * @description Java 유틸을 참고 (아래 링크 참고)
 * @link https://github.com/kdk1026/CommonJava8/blob/master/CommonJava8/src/main/java/common/util/crypto/HashFunctionUtil.java
 */

const crypto = require("crypto");

function md5Hex(plainText) {
    return crypto.createHash('md5').update(plainText).digest('hex');
}

function sha256Hex(plainText) {
    return crypto.createHash('sha256').update(plainText).digest('hex');
}

function sha512Hex(plainText) {
    return crypto.createHash('sha512').update(plainText).digest('hex');
}

module.exports = {
    md5Hex,
    sha256Hex,
    sha512Hex
};