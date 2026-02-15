/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2026.02.15
 * @version 1.0
 */

const tls = require('node:tls');

const ExceptionMessage = {
    isNullOrEmpty: (paramName) => {
        return `${paramName} is null or empty`;
    }
};

export const isConnected = async (host, port) => {
    if ( !host?.trim() ) {
        throw new Error(ExceptionMessage.isNullOrEmpty('host'));
    }

    if ( port < 0 || port > 65535 ) {
        throw new Error("port must be between 0 and 65535");
    }

    return new Promise((resolve) => {
        const socket = tls.connect(port, host, {
            timeout: 5000
        }, () => {
            socket.destroy();
            resolve(true);
        });

        socket.on('error', (err) => {
            console.error(`Connection failed to ${host}:${port}`, err.message);
            socket.destroy();
            resolve(false);
        });

        socket.on('timeout', () => {
            console.warn(`Connection timeout to ${host}:${port}`);
            socket.destroy();
            resolve(false);
        });
    });
};