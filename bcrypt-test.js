const { bcryptHash, checkBcryptHash } = require("./crypto/bcrypt-util");

(async () => {
    const originalText = 'qwer1234';

    const hashedText = await bcryptHash(originalText);
    console.log(hashedText);

    const isMatch = await checkBcryptHash(originalText, hashedText);
    console.log(isMatch);
})();
