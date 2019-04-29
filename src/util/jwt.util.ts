import * as jwt from 'jsonwebtoken';

/**
 * used to generate JWT token
 * @param data 
 */
export const jwtTokenGenerator = async (data: any) => {
    data["currentTime"] = Date.now();
    return await jwt.sign(data || {}, process.env["jwt_secret"]);
}

/**
 * used to verify and parse data from JWT token
 * @param data 
 */
export const jwtTokenVerifier = async (data: string) => {
    try {
        let token = data || "";
        let tokenData = jwt.verify(token, process.env["jwt_secret"]);
        if (!tokenData) return { failed: true };
        return { failed: false, tokenData };
    } catch (err) {
        return { failed: true };
    }
}