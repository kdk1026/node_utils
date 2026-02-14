import { bcryptHash, checkBcryptHash } from "../../crypto/bcrypt-util";

async function runTest() {
    try {
        const originalText = 'qwer1234';

        console.log("--- 해싱 시작 ---");
        const hashedText = await bcryptHash(originalText);
        console.log('생성된 해시:', hashedText);

        console.log("\n--- 검증 시작 ---");
        const isMatch = await checkBcryptHash(originalText, hashedText);
        console.log('일치 여부:', isMatch);

        // 실패 케이스 테스트
        const isWrongMatch = await checkBcryptHash('wrong_password', hashedText);
        console.log('잘못된 비번 결과 (false여야 함):', isWrongMatch);

    } catch (error) {
        console.error('테스트 중 오류 발생:', error.message);
    }
}

runTest();