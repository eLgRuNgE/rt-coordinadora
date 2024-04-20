const express = require('express');
// const { authenticateToken } = require('./src/middleware/auth');
const cors = require('cors');
const eventRoutes = require('./src/routes/eventRoutes');
const userRoutes = require('./src/routes/userRoutes');
const bulkDataRoutes = require('./src/routes/bulkDataUploadRoutes');
const swaggerConfig = require('./src/config/swagger');

const app = express();

// Middlewares
// Middleare para restringir dominios
app.use(cors());
app.use(express.json()); 

// Rutas
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bulk-upload', bulkDataRoutes);

swaggerConfig.setup(app);

// Middleware de errores
app.use((err, req, res, next) => {
    res.status(err.status || 500).send({ error: { message: err.message } });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});