const bcrypt = require('bcrypt');

module.exports = {
    hash: (pass) => bcrypt.hash(pass, 10),
    compare: async (pass, hashPass) => {
        const isPassMatch = await bcrypt.compare(pass, hashPass);

        if(!isPassMatch){
            throw new Error('wrong data');
        }
    }
};
