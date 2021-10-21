module.exports = {
    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/okten-hw-node',
    PORT: process.env.PORT || 5000,

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'Dazai',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'Kunikida',

    TEST_EMAIL: process.env.TEST_EMAIL,
    TEST_EMAIL_PASS: process.env.TEST_EMAIL_PASS
};
