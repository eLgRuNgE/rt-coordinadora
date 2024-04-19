const express = require('express');
const cors = require('cors');
const eventRoutes = require('./src/routes/events'); // Ejemplo de rutas para eventos
const swaggerConfig = require('./src/config/swagger');

const app = express();

app.use(cors());
app.use(express.json()); 

// Rutas
app.use('/api/events', eventRoutes);

swaggerConfig.setup(app);

// Middleware de errores
app.use((err, req, res, next) => {
    res.status(err.status || 500).send({ error: { message: err.message } });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});