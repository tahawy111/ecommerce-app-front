import jwt from "jsonwebtoken";

export const generateActiveToken = (payload: object): string => {
    return jwt.sign(payload, `${process.env.ACTIVE_TOKEN_SECRET}`, {
        expiresIn: "5m",
    });
};
export const generateAccessToken = (payload: object): string => {
    return jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, {
        expiresIn: "30d",
    });
};
export const generateRefreshToken = (payload: object): string => {
    return jwt.sign(payload, `${process.env.REFRESH_TOKEN_SECRET}`, {
        expiresIn: "30d",
    });
};