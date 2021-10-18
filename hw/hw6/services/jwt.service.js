const jwt = require('jsonwebtoken');
const ErrorHandler = require('../errors/ErrorHandler');
const tokenTypeEnum = require('../configs/tokenType.enum');
const {JWT_ACCESS_SECRET, JWT_REFRESH_SECRET} = require('../configs/config');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, JWT_ACCESS_SECRET, {expiresIn: '15m'});
        const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, {expiresIn: '30d'});

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType = tokenTypeEnum.ACCESS) => {
        try {
            const secretKey = tokenType === tokenTypeEnum.ACCESS ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET;
            await jwt.verify(token, secretKey);
        }
        catch (e) {
            throw new ErrorHandler('invalid token', 401);
        }
    }
};
