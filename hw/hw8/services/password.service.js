const bcrypt = require('bcrypt');

const ErrorHandler = require('../errors/ErrorHandler');
const {ERR_MSG, STATUS_CODE} = require('../configs');

module.exports = {
    hash: (pass) => bcrypt.hash(pass, 10),

    compare: async (pass, hashPass) => {
        const isPassMatch = await bcrypt.compare(pass, hashPass);

        if(!isPassMatch){
            throw new ErrorHandler(ERR_MSG.WRONG_EMAIL_OR_PASSWORD, STATUS_CODE.BAD_REQUEST);
        }
    }
};
