// const handleUnauthorized = async () => {
//     // Try to refresh token, then redirect to login
//     window.location.href = '/login';
// };

const handleRateLimit = async () => {
    alert('Too many requests. Please wait a moment.');
};

const handleServerError = async () => {
    alert('Server error. Please try again later.');
}

export const httpStatusCodes = {
    // "401": handleUnauthorized,
    "429": handleRateLimit,
    "500": handleServerError
}