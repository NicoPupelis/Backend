const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


transporter.verify((error, success) => {
    if (error) {
        console.error("❌ Error en la conexión con Gmail SMTP:", error);
    } else {
        console.log("✅ Gmail SMTP está listo para enviar correos.");
    }
});

module.exports = transporter;
