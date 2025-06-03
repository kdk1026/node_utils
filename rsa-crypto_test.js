const { generateRsaKeyPair, Convert, encrypt, RsaAlgorithm, decrypt } = require("./crypto/rsa-crypto-util");

const test = async () => {
    console.log("--- Generating RSA Key Pair ---");
    const keyPair = await generateRsaKeyPair(2048);
    const publicKey = keyPair.publicKey;
    const privateKey = keyPair.privateKey;
    
    console.log("\n--- Converting Keys to Base64 String ---");
    const base64PublicKey = Convert.convertPublicKeyToString(publicKey);
    const base64PrivateKey = Convert.convertPrivateKeyToString(privateKey);
    
    console.log("Base64 Public Key:", base64PublicKey.substring(0, 50) + "...");
    console.log("Base64 Private Key:", base64PrivateKey.substring(0, 50) + "...");
    
    console.log("\n--- Converting Base64 String back to Keys ---");
    const restoredPublicKey = Convert.convertStringToPublicKey(base64PublicKey);
    const restoredPrivateKey = Convert.convertStringToPrivateKey(base64PrivateKey);
    
    console.log("Restored Public Key Type:", restoredPublicKey ? "Success" : "Failed");
    console.log("Restored Private Key Type:", restoredPrivateKey ? "Success" : "Failed");
    
    const plainText = "This is a secret message to be encrypted using RSA OAEP with SHA256.";
    console.log("\n--- Encryption ---");
    console.log("Original Plain Text:", plainText);
    
    const encryptedText = encrypt(RsaAlgorithm.RSA_ECB_OAEP_WITH_SHA256_AND_MGF1_PADDING, restoredPublicKey, plainText);
    console.log("Encrypted Text (Base64):", encryptedText);
    
    console.log("\n--- Decryption ---");
    const decryptedText = decrypt(RsaAlgorithm.RSA_ECB_OAEP_WITH_SHA256_AND_MGF1_PADDING, restoredPrivateKey, encryptedText);
    console.log("Decrypted Text:", decryptedText);
    
    console.log("Verify : ", plainText === decryptedText);
};

test();