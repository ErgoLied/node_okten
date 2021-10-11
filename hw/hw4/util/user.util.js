module.exports = {
    userNormalize: (userToNorm = {}) => {
        const fieldsToRemove = ['password'];

        fieldsToRemove.forEach((field) => {
            delete userToNorm[field];
        });

        return userToNorm;
    }
};
