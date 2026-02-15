/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2026.02.15
 * @version 1.0
 */

/**
 * 이름 마스킹 처리
 * - 한글
 *   - 2글자 -> 첫 자리 제외 마스킹 (예: 홍길 -> 홍*)
 *   - 3글자 이상 -> 첫 자리, 마지막 자리 제외 마스킹 (예: 홍길동 -> 홍*동)
 * - 영문
 *   - 4자리 이하 -> 앞 2자리 제외 마스킹 (예: Adam -> Ad**)
 *   - 4자리 이상 -> 앞 4자리 제외 마스킹 (예: Jessica -> Jess***)
 * @param {string} name 
 */
export const maskName = (name) => {
    if ( typeof name !== 'string' || !name?.trim() ) {
        return '';
    }

    if (name.length > 50) {
        return name;
    }

    const koreanRegex = /^[ㄱ-ㅎㅏ-ㅣ가-힣]+$/;

    if ( koreanRegex.test(name) ) {
        return maskKoreanName(name);
    } else {
        return maskEnglishName(name);
    }
};

const maskKoreanName = (name) => {
    const length = name.length;
    const firstChar = name.charAt(0);

    if (length === 2) {
        return firstChar + "*";
    }

    const lastChar = name.charAt(length - 1);
    const maskedMiddle = "*".repeat(length - 2);

    return firstChar + maskedMiddle + lastChar;
}

const maskEnglishName = (name) => {
    const length = name.length;

    if (length <= 4) {
        return name.substring(0, length - 2) + "**";
    } else {
        const prefix = name.substring(0, 4);
        const masked = "*".repeat(length - 4);
        return prefix + masked;
    }
}

/**
 * 주민등록번호 마스킹 (하이픈 포함)
 * - 뒷자리 마스킹
 * @param {string} rrn 
 * @param {boolean} isShowGender 
 * @returns 
 */
export const maskRRN = (rrn, isShowGender) => {
    if ( !rrn || rrn.length !== 14 || rrn.charAt(6) !== '-' ) {
        throw new Error("Invalid Resident Registration Number");
    }

    if (isShowGender) {
        // 성별 숫자까지 표시
        return rrn.substring(0, 8) + "*".repeat(6);
    } else {
        // 뒷자리 전체 마스킹
        return rrn.substring(0, 7) + "*".repeat(7);
    }
};

/**
 * 여권번호 마스킹
 * - 뒤 4자리 마스킹
 * @param {string} passportNumber 
 * @returns 
 */
export const maskPassportNumber = (passportNumber) => {
    if ( !passportNumber || passportNumber.length < 5 ) {
        throw new Error("Invalid Passport Number");
    }

    const length = passportNumber.length;

    return passportNumber.substring(0, length - 4) + "*".repeat(4);
};

/**
 * 전화번호 마스킹
 * - 가운데 부분 마스킹
 * 
 * - 일반 전화번호
 * - 070 인터넷 전화(VoIP)
 * - 080 수신자 부담 전화
 * - 030, 050 평생번호 및 안심번호
 * - 휴대폰 번호
 * @param {string} phoneNumber 
 * @returns 
 */
export const maskPhoneNum = (phoneNumber) => {
    if ( typeof phoneNumber !== 'string' || !phoneNumber?.trim() ) {
        return '';
    }

    const cleanNum = phoneNumber.replaceAll('-', "");
    const len = cleanNum.length;

    if (len >= 9) {
        const last = cleanNum.substring(len - 4);

        const firstPartEndIdx = cleanNum.startsWith("02") ? 2 : 3;
        const first = cleanNum.substring(0, firstPartEndIdx);

        const middlePartLen = len - 4 - firstPartEndIdx;
        const maskedMiddle = "*".repeat(middlePartLen);

        return `${first}-${maskedMiddle}-${last}`;
    }

    return cleanNum;
};

/**
 * 아이디 마스킹
 * - 4번째 자리부터 끝까지 마스킹
 * @param {string} id 
 * @returns 
 */
export const maskId = (id) => {
    if ( typeof id !== 'string' || !id?.trim() ) {
        return '';
    }

    const length = id.length;

    if (length <= 3) {
        // 아이디가 3글자 이하인 경우 마스킹하지 않음
        return id; 
    } else {
        // 앞 3글자만 표시하고 나머지 마스킹
        return id.substring(0, 3) + "*".repeat(length - 3);
    }
};

/**
 * 이메일 마스킹
 * - ID 4번재 자리부터 마스킹
 * @param {string} email 
 * @returns 
 */
export const maskEmail = (email) => {
    if ( typeof email !== 'string' || !email?.trim() ) {
        return '';
    }

    const atIndex = email.indexOf("@");

    if (atIndex < 1) {
        throw new Error("Invalid email address");
    }

    const idPart = email.substring(0, atIndex);
    const domainPart = email.substring(atIndex);

    const maskedIdPart = maskId(idPart);

    return maskedIdPart + domainPart;
};

/**
 * 주소 마스킹
 * - 도로명 이하의 건물번호 및 상세주소의 숫자
 * @param {string} address 
 * @returns 
 */
export const maskRoadAddress = (address) => {
    if ( typeof address !== 'string' || !address?.trim() ) {
        return '';
    }

    return address.replaceAll(/\d/g, "*");
};

/**
 * 카드번호 마스킹
 * - startIndex (7 or 9)
 * - 일반적으로 15/16자리 중 7번째부터 12번째 숫자 (혹은 9번째부터 12번째 숫자)를 마스킹
 * @param {string} cardNumber 
 * @param {number} startIndex 
 * @returns 
 */
export const maskCardNumber = (cardNumber, startIndex) => {
    if ( typeof cardNumber !== 'string' || !cardNumber?.trim() ) {
        return '';
    }

    if ( startIndex !== 7 && startIndex !== 9 ) {
        throw new Error("Invalid start index. It should be either 7 or 9.");
    }

    const digitsOnly = cardNumber.replaceAll(/[^\d]/g, "");
    const length = digitsOnly.length;

    const chars = digitsOnly.split("");

    // 마스킹 제한 설정 (7일 때 6개, 9일 때 4개)
    const maskLimit = (startIndex === 7) ? 6 : 4;
    let maskedSoFar = 0;

    for (let i = 0; i < chars.length; i++) {
        if ( (i + 1) >= startIndex && maskedSoFar < maskLimit ) {
            chars[i] = '*';
            maskedSoFar++;
        }
    }

    const maskedStr = chars.join("");

    return formatByLength(maskedStr, length);
};

const formatByLength = (maskedStr, length) => {
    if (length === 16) {
        return `${maskedStr.substring(0, 4)}-${maskedStr.substring(4, 8)}-${maskedStr.substring(8, 12)}-${maskedStr.substring(12)}`;
    } else if (length === 15) {
        return `${maskedStr.substring(0, 4)}-${maskedStr.substring(4, 10)}-${maskedStr.substring(10)}`;
    }

    return maskedStr;
};

/**
 * 계좌번호 마스킹 (하이픈 포함)
 * - 뒤에서부터 5자리 마스킹
 * @param {string} accountNumber 
 * @returns 
 */
export const maskAccountNumber = (accountNumber) => {
    if ( typeof accountNumber !== 'string' || !accountNumber?.trim() ) {
        return '';
    }

    const chars = accountNumber.split("");
    let maskedCount = 0;

    for (let i = chars.length - 1; i >= 0; i--) {
        if ( /\d/.test(chars[i]) ) {
            chars[i] = '*';
            maskedCount++;
        }

        if (maskedCount === 5) break;
    }

    return chars.join("");
};

/**
 * 생년월일 마스킹
 * - 년도 마스킹
 * @param {string} birthdate 
 * @returns 
 */
export const maskBirthdate = (birthdate) => {
    if ( typeof birthdate !== 'string' || !birthdate?.trim() ) {
        return '';
    }

    const hasHyphen = birthdate.includes("-");
    const digitsOnly = birthdate.replaceAll(/[^\d]/g, "");

    if ( digitsOnly.length === 8 ) {
        const mm = digitsOnly.substring(4, 6);
        const dd = digitsOnly.substring(6, 8);
        const maskedDate = "****" + mm + dd;

        if (hasHyphen) {
            return `****-${mm}-${dd}`;
        }

        return maskedDate;
    } else {
        return "";
    }
};

/**
 * IP 주소 마스킹
 * - 뒤 3자리 마스킹
 * @param {string} ipAddress 
 * @returns 
 */
export const maskIPAddress = (ipAddress) => {
    if ( typeof ipAddress !== 'string' || !ipAddress?.trim() ) {
        return '';
    }

    const ipv4Regex = /^\d+\.\d+\.\d+\.\d+$/;

    if ( ipv4Regex.test(ipAddress) ) {
        const lastDotIndex = ipAddress.lastIndexOf('.');
        if ( lastDotIndex !== -1 ) {
            const prefix = ipAddress.substring(0, lastDotIndex + 1);
            return prefix + "***";
        }
    }
    return "";
};

/**
 * IPv6 주소 마스킹
 * - 뒤 2개 블록 마스킹
 * @param {string} ipv6Address 
 */
export const maskIPv6Address = (ipv6Address) => {
    if ( typeof ipv6Address !== 'string' || !ipv6Address?.trim() ) {
        return '';
    }

    // Scope ID 제거
    const cleanAddress = ipv6Address.split("%")[0];

    const ipv6Pattern = /(:[0-9a-fA-F]{1,4}){2}$/;

    // 유효한 IP 주소인지 검증
    if ( !cleanAddress.includes(':') ) {
        return "";
    }

    const masked = cleanAddress.replace(ipv6Pattern, ":****:****");

    return masked === cleanAddress ? "" : masked;
};

/**
 * 학번 마스킹
 * - 숫자 : 입학 연도 외 마스킹
 * - 문자 + 숫자 : 문자만 마스킹
 * @param {string} studentID 
 * @returns 
 */
export const maskStudentID = (studentID) => {
    if ( typeof studentID !== 'string' || !studentID?.trim() ) {
        return '';
    }

    // 숫자만 포함된 학번 (예: 202312345)
    if ( /^\d{8,9}$/.test(studentID) ) {
        return studentID.substring(0, 4) + "****";
    }
    // 문자와 숫자가 섞인 학번 (예: 23AB1234)
    else if ( /^\d{2}[A-Za-z]{2}\d{4}$/.test(studentID) ) {
        return studentID.substring(0, 2) + "**" + studentID.substring(4, 8);   
    }

    return "";
};

/**
 * 비밀번호 마스킹
 * - 계정 비밀번호는 대상 아님
 * @param {string} password 
 * @returns 
 */
export const maskPassword = (password) => {
    if ( typeof password !== 'string' || !password?.trim() ) {
        return '';
    }

    return "*".repeat(password.length);
};