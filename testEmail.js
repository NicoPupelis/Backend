require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    debug: true, // Activa logs detallados
    logger: true, // Habilita el registro de eventos
});

const mailOptions = {
    from: `"Mi App" <noreply@yourdomain.com>`, // Cambia a un dominio genérico
    to: "correo@ejemplo.com", // Mailtrap interceptará este correo
    subject: "Test directo desde script",
    text: "Este es un test de correo sin Express ni MongoDB.",
};

// Enviar email de prueba
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error("❌ Error al enviar el correo:", error);
    } else {
        console.log("✅ Correo enviado con éxito:", info.response);
    }
});
