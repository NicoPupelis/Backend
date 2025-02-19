require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// 🔧 Configurar CORS
const corsOptions = {
    origin: "http://localhost:5173", // Ajustar según la URL del frontend
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
};

app.use(cors(corsOptions)); // Aplicar CORS
app.use(express.json()); // 🔥 Importante para leer req.body en JSON
app.use(express.urlencoded({ extended: true }));

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("🔥 Conectado a MongoDB Local"))
.catch(err => console.error("❌ Error en la conexión a MongoDB:", err));

// Importar rutas
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/mensajes", require("./routes/mensajesRoutes"));

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("API funcionando 🚀");
});

// Puerto del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));
