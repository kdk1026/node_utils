/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2021.05.12
 * @version 1.0
 */

const crypto = require("node:crypto");

export function md5Hex(plainText) {
    return crypto.createHash('md5').update(plainText).digest('hex');
}

export function sha256Hex(plainText) {
    return crypto.createHash('sha256').update(plainText).digest('hex');
}

export function sha512Hex(plainText) {
    return crypto.createHash('sha512').update(plainText).digest('hex');
}