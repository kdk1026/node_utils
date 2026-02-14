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

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            return data;
        } else {
            const data = await response.text();
            return data;
        }
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

    const isFormData = bodyObj instanceof FormData;

    const isInvalidBody = isFormData
        ? false
        : !bodyObj ||
        (Array.isArray(bodyObj) && bodyObj.length === 0) || 
        (typeof bodyObj === 'object' && Object.keys(bodyObj).length === 0);

    if ( isInvalidBody ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('bodyObj'));
    }

    const path = uriVariables.length > 0 ? `/${uriVariables.join('/')}` : '';
    const fullUrl = `${url}${path}`;

    const mergedHeaders = { ...headers };
    if ( !isFormData ) {
        mergedHeaders['Content-Type'] = 'application/json';
    }

    const options = {
        method: "POST",
        headers: mergedHeaders,
        body: isFormData ? bodyObj : JSON.stringify(bodyObj),
        dispatcher: isVerify ? undefined : insecureAgent
    }

    try {
        const response = await fetch(fullUrl, options);

        if ( !response.ok ) {
            throw new Error(`HTTP 에러 발생! 상태코드: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            return data;
        } else {
            const data = await response.text();
            return data;
        }
    } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
    }
};