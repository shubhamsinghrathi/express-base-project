export const CONSTANT = {
    LIMIT: 10,
    MAX_LIMIT: 100,
    defaultRadius: 30, //in miles
    itemLimit: 10,

    HTTP_STATUS_CODE: {
        OK: 200,
        CREATED: 201,
        UPDATED: 202,
        NO_CONTENT: 204,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        PAYMENY_REQUIRED: 402,
        ACCESS_FORBIDDEN: 403,
        URL_NOT_FOUND: 404,
        METHOD_NOT_ALLOWED: 405,
        UNREGISTERED: 410,
        PAYLOAD_TOO_LARGE: 413,
        CONCURRENT_LIMITED_EXCEEDED: 429,
        INTERNAL_SERVER_ERROR: 500,
        BAD_GATEWAY: 502,
        SHUTDOWN: 503
    },
    HTTP_RESPONSED: {
        FAILED_API_RESPONSE: (status, msg= null) => {
            return {
                success: false,
                statusCode: status,
                message: msg || 'Internal server error',
                result: {},
                time: 0
            }
        },
        INVALID_URL_RESPONSE: {
            success: false,
            statusCode: 404,
            message: 'Invalid route',
            result: {},
            time: 0
        }
    },
    DB_MODEL_REF: {
        ADMIN: "admins"
    },
    REGEX: {
        EMAIL: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$/,
        URL: /^(https?|ftp|torrent|image|irc):\/\/(-\.)?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?$/i,
        ZIP_CODE: /^[0-9]{5}(?:-[0-9]{4})?$/,
        PASSWORD: /(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}/, // Minimum 6 characters, At least 1 lowercase alphabetical character, At least 1 uppercase alphabetical character, At least 1 numeric character, At least one special character
        COUNTRY_CODE: /^\d{1,4}$/,
        MOBILE_NUMBER: /^\d{6,16}$/,
    }
};