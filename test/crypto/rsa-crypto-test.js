import { Convert, decrypt, encrypt, generateRsaKeyPair } from "../../crypto/rsa/rsa-crypto-util";

const test = async () => {
    const keyPair = generateRsaKeyPair(2048);
    // console.log(keyPair);

    const base64PublicKey = Convert.convertKeyToString(keyPair.publicKey);
    // console.log(base64PublicKey);

    const publicKey = Convert.convertStringToPublicKey(base64PublicKey);
    // console.log(publicKey);

    const base64PrivateKey = Convert.convertKeyToString(keyPair.privateKey);
    // console.log(base64PrivateKey);

    const privateKey = Convert.convertStringToPrivateKey(base64PrivateKey);
    // console.log(privateKey);

    const encryptedData = encrypt(publicKey, '야호');
    console.log(encryptedData);

    const decryptedData = decrypt(privateKey, encryptedData);
    console.log(decryptedData);
};

test();