const jwt = require('jsonwebtoken');

const ErrorHandler = require('../errors/ErrorHandler');
const {CONFIG, TOKEN_TYPE, ERR_MSG, STATUS_CODE, ACTION_TOKEN_TYPE} = require('../configs');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, CONFIG.JWT_ACCESS_SECRET, {expiresIn: '15m'});
        const refresh_token = jwt.sign({}, CONFIG.JWT_REFRESH_SECRET, {expiresIn: '30d'});

        return {
            access_token,
            refresh_token
        };
    },

    generateActionToken: (actionTokenType) => {
        let secret;

        switch (actionTokenType){
            case ACTION_TOKEN_TYPE.FORGOT_PASSWORD:
                secret = CONFIG.JWT_ACTION_FORGOT_PASS_SECRET;
                break;
            default:
                throw new ErrorHandler(ERR_MSG.WRONG_TOKEN_TYPE, STATUS_CODE.INTERNAL_SERVER_ERROR);
        }

        return jwt.sign({}, secret, {expiresIn: '24h'});
    },

    verifyToken: async (token, tokenType = TOKEN_TYPE.ACCESS) => {
        try {
            let secretKey;

            switch (tokenType){
                case TOKEN_TYPE.ACCESS:
                    secretKey = CONFIG.JWT_ACCESS_SECRET;
                    break;
                case TOKEN_TYPE.REFRESH:
                    secretKey = CONFIG.JWT_REFRESH_SECRET;
                    break;
                case TOKEN_TYPE.ACTION:
                    secretKey = CONFIG.JWT_ACTION_FORGOT_PASS_SECRET;
                    break;
                default:
                    throw new ErrorHandler(ERR_MSG.WRONG_TOKEN_TYPE, STATUS_CODE.INTERNAL_SERVER_ERROR);
            }

            await jwt.verify(token, secretKey);
        }
        catch (e) {
            throw new ErrorHandler(ERR_MSG.INVALID_TOKEN, STATUS_CODE.UNAUTHORIZED);
        }
    }
};
