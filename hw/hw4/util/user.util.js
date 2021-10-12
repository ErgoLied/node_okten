module.exports = {
    userNormalize: (userToNorm = {}) => {
        const fieldsToRemove = [
            'password',
            '__v'
        ];

        fieldsToRemove.forEach((field) => {
            delete userToNorm[field];
        });

        return userToNorm;
    }
};
