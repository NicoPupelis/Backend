const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// 📌 Definir esquema y modelo de mensajes
const mensajeSchema = new mongoose.Schema({
    canal: { type: String, required: true },
    usuario: { type: String, default: "Anónimo" },
    texto: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const Mensaje = mongoose.model("Mensaje", mensajeSchema);

// 📩 Obtener mensajes de un canal
router.get("/:canal", async (req, res) => {
    try {
        const { canal } = req.params;
        if (!canal) {
            return res.status(400).json({ error: "El canal es requerido" });
        }
        const mensajes = await Mensaje.find({ canal }).sort({ timestamp: 1 });
        res.json(mensajes);
    } catch (error) {
        console.error("❌ Error al obtener los mensajes:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// ✉️ Enviar mensaje a un canal
router.post("/", async (req, res) => {
    try {
        console.log("📩 Datos recibidos en el backend:", req.body); // Verifica en la terminal

        const { canal, usuario, texto } = req.body;

        if (!canal || !usuario || !texto) {
            return res.status(400).json({ error: "Faltan datos en la solicitud" });
        }

        const mensaje = new Mensaje({ canal, usuario, texto });
        await mensaje.save();

        res.status(201).json(mensaje);
    } catch (error) {
        console.error("❌ Error al guardar el mensaje:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

module.exports = router;
