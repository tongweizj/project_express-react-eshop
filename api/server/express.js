import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compress from 'compression'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import path from 'path'

import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import categoryRoutes from './routes/category.routes.js'
import listingRoutes from './routes/listing.routes.js'
import ratingRoutes from './routes/rating.routes.js'

const app = express()
const CWD = process.cwd()

// 1) CORS configurado COM credenciais
app.use(cors({
  origin: 'http://localhost:5174',   // ou 5180, conforme seu frontend
  credentials: true,                  // <— essencial para cookies/sessões
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}))
// opcional, mas garante que o preflight OPTIONS seja atendido
app.options('*', cors({
  origin: 'http://localhost:5174',
  credentials: true
}))

// 2) Segurança e compressão
app.use(helmet())
app.use(compress())

// 3) Parsers
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

// 4) Arquivos estáticos
app.use("/uploads", express.static(path.join(CWD, "../../server/uploads")))
app.use('/dist', express.static(path.join(CWD, 'dist')))

// 5) Rotas
app.use('/', userRoutes)
app.use('/', authRoutes)      // <-- aqui entra /auth/signin
app.use('/', categoryRoutes)
app.use('/', listingRoutes)
app.use('/', ratingRoutes)

// 6) Error handler
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: `${err.name}: ${err.message}` })
  }
  console.error(err)
  res.status(400).json({ error: `${err.name}: ${err.message}` })
})

export default app
