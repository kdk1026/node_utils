import { Agent } from "undici";

const ExceptionMessage = {
    isNull: (paramName) => {
        return `${paramName} is null`;
    },

    isNullOrEmpty: (paramName) => {
        return `${paramName} is null or empty`;
    }
};

// 인증서 검증을 하지 않는 에이전트 생성
const insecureAgent = new Agent({
    connect: {
        rejectUnauthorized: false
    }
});

export const get = async (isVerify, url, headers, ...uriVariables) => {
    if ( !isVerify ) {
        throw new Error(ExceptionMessage.isNull('isVerify'));
    }

    if ( !url?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('url'));
    }

    const path = uriVariables.length > 0 ? `/${uriVariables.join('/')}` : '';
    const fullUrl = `${url}${path}`;

    const options = {
        method: "GET",
        headers: headers || undefined,
        dispatcher: isVerify ? undefined : insecureAgent
    }

    try {
        const response = await fetch(fullUrl, options);

        if ( !response.ok ) {
            throw new Error(`HTTP 에러 발생! 상태코드: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
    }
};

export const post = async (isVerify, url, headers, bodyObj, ...uriVariables) => {
    if ( !isVerify ) {
        throw new Error(ExceptionMessage.isNull('isVerify'));
    }

    if ( !url?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('url'));
    }

    const isInvalidBody = !bodyObj || 
        (Array.isArray(bodyObj) && bodyObj.length === 0) || 
        (typeof bodyObj === 'object' && Object.keys(bodyObj).length === 0);

    if ( isInvalidBody ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('bodyObj'));
    }

    const path = uriVariables.length > 0 ? `/${uriVariables.join('/')}` : '';
    const fullUrl = `${url}${path}`;

    const mergedHeaders = {
        'Content-Type': 'application/json',
        ...headers
    };

    const options = {
        method: "POST",
        headers: mergedHeaders,
        body: JSON.stringify(bodyObj),
        dispatcher: isVerify ? undefined : insecureAgent
    }

    try {
        const response = await fetch(fullUrl, options);

        if ( !response.ok ) {
            throw new Error(`HTTP 에러 발생! 상태코드: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
    }
};