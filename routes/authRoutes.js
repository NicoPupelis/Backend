const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const transporter = require("../config/emailConfig"); 

const router = express.Router();


router.post("/register", async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "El usuario ya existe" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ nombre, email, password: hashedPassword });
        await user.save();

        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "¡Bienvenido a la aplicación!",
            html: `<h1>Hola, ${nombre}!</h1><p>Tu registro fue exitoso. ¡Bienvenido a nuestra plataforma! 🚀</p>`,
        };

        await transporter.sendMail(mailOptions);

        res.json({ msg: "Usuario registrado correctamente. Revisa tu correo 📩" });
    } catch (err) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
});


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Usuario no encontrado" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Contraseña incorrecta" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, user: { id: user._id, nombre: user.nombre, email: user.email } });
    } catch (err) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
});

module.exports = router;
