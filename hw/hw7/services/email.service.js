const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const {CONFIG, ERR_MSG, STATUS_CODE} = require('../configs');
const allTemplates = require('../email-templates');
const ErrorHandler = require('../errors/ErrorHandler');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: CONFIG.TEST_EMAIL,
        pass: CONFIG.TEST_EMAIL_PASS
    }
});

const sendMail = async (userMail, emailAction, context = {}) => {
    const templateInfo = allTemplates[emailAction];

    if (!templateInfo){
        throw new ErrorHandler(ERR_MSG.WRONG_TEMPLATE, STATUS_CODE.BAD_REQUEST);
    }

    const html = await templateParser.render(templateInfo.templateName, context);

    return transporter.sendMail({
        from: 'My magic app',
        to: userMail,
        subject: templateInfo.subject,
        html
    });
};

module.exports = {sendMail};
