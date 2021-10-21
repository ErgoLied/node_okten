const jwt = require('jsonwebtoken');

const ErrorHandler = require('../errors/ErrorHandler');
const {CONFIG, TOKEN_TYPE, ERR_MSG, STATUS_CODE} = require('../configs');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, CONFIG.JWT_ACCESS_SECRET, {expiresIn: '15m'});
        const refresh_token = jwt.sign({}, CONFIG.JWT_REFRESH_SECRET, {expiresIn: '30d'});

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType = TOKEN_TYPE.ACCESS) => {
        try {
            const secretKey = tokenType === TOKEN_TYPE.ACCESS ? CONFIG.JWT_ACCESS_SECRET : CONFIG.JWT_REFRESH_SECRET;
            await jwt.verify(token, secretKey);
        }
        catch (e) {
            throw new ErrorHandler(ERR_MSG.INVALID_TOKEN, STATUS_CODE.UNAUTHORIZED);
        }
    }
};
