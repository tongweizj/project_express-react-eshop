import config from './config/config.js';
import app from './server/express.js';
import mongoose from 'mongoose';
import cors from 'cors';  // Importando o CORS

// Usar o CORS para permitir requisições do frontend na porta 5174
app.use(cors({
  origin: 'http://localhost:5174',  // Adicione a URL correta do seu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Conectar ao MongoDB
mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
});

// Rota de teste
app.get("/", (req, res) => {
    res.json({ message: "Welcome to User application." });
});

// Iniciar o servidor
app.listen(config.port, (err) => {
    if (err) {
        console.log(err);
    }
    console.info('Server started on port %s.', config.port);
});
