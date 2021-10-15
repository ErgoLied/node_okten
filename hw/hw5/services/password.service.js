const bcrypt = require('bcrypt');

const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    hash: (pass) => bcrypt.hash(pass, 10),

    compare: async (pass, hashPass) => {
        const isPassMatch = await bcrypt.compare(pass, hashPass);

        if(!isPassMatch){
            throw new ErrorHandler('wrong email or password', 400);
        }
    }
};
