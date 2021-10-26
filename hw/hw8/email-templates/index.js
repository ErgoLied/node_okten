const {EMAIL_ACTION} = require('../configs');

module.exports = {
    [EMAIL_ACTION.WELCOME]:{
        templateName: 'welcome',
        subject: 'Welcome!'
    },
    [EMAIL_ACTION.LOG_IN]:{
        templateName: 'log-in',
        subject: 'Hello!'
    },
    [EMAIL_ACTION.LOG_OUT]:{
        templateName: 'log-out',
        subject: 'G-Bye!'
    },
    [EMAIL_ACTION.UPDATE_USER]:{
        templateName: 'update-user',
        subject: 'Your name has been changed'
    },
    [EMAIL_ACTION.DELETE_USER]:{
        templateName: 'delete-user',
        subject: 'Already leaving?'
    },
    [EMAIL_ACTION.FORGOT_PASSWORD]:{
        templateName: 'forgot-password',
        subject: 'Return of lost memories'
    },
};
