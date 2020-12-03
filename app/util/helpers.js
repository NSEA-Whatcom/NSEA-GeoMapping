module.exports = {
    // differentiates Joi errors from custom errors
    parseError: err => {
        if (err.isJoi){
            return err.details[0];
        } 
        return JSON.stringify(err,
            Object.getOwnPropertyNames(err));
    },
    // returns object containing what should be saved in the session
    sessionizeUser: user => {
        return { userId: user.id, Username: user.Username };
    }
}