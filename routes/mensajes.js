const express = require("express");
const router = express.Router();


let mensajesDB = {};


router.get("/mensajes/:canal", (req, res) => {
    const { canal } = req.params;
    const mensajes = mensajesDB[canal] || [];
    res.json(mensajes);
});


router.post("/mensajes", (req, res) => {
    const { canal, texto } = req.body;

    if (!canal || !texto) {
        return res.status(400).json({ error: "Faltan datos en la solicitud" });
    }

    const nuevoMensaje = {
        usuario: "Tú",
        texto,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    if (!mensajesDB[canal]) {
        mensajesDB[canal] = [];
    }
    mensajesDB[canal].push(nuevoMensaje);

    console.log(`📩 Mensaje recibido en canal ${canal}: ${texto}`);
    res.json(nuevoMensaje);
});

module.exports = router;
