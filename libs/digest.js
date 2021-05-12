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