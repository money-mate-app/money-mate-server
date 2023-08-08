export const getOtpCacheKey = (email: string) => {
    return `otp/${email}`;
};
