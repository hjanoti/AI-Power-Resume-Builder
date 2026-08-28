// One place to turn any thrown value into something worth showing a user.
const getErrorMessage = (error, fallback = "Something went wrong. Please try again.") => {
    if (error?.code === "ECONNABORTED") {
        return "The server is taking too long to respond. Please try again.";
    }

    // No response object means the request never reached the API.
    if (error?.request && !error?.response) {
        return "Cannot reach the server. Check your connection and try again.";
    }

    return error?.response?.data?.message || error?.message || fallback;
};

export default getErrorMessage;
