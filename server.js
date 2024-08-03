import CommentRouter from "./src/routes/commentsRoutes.js";
import authRouter from "./src/routes/AuthenticaticationRoutes.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import postsRouter from "./src/routes/postsRoutes.js";
import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";
import { sequelize } from "./config/config.js";
import { syncDB } from "./config/syncDB .js";
import { seedDatabase } from "./src/controllers/seederController.js";

// Load environment variables
dotenv.config()

const app = express()
const port = process.env.server_PORT || 3000

// Middleware to parse JSON
app.use(express.json())

// Swagger UI setup
const swaggerDocument = yaml.load('./swaggerdocumentation.yaml')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
// Set up routes
app.use('/auth', authRouter)
app.use('/posts', postsRouter)
app.use('/comments', CommentRouter)
app.use('/seed', seedDatabase)

app.use((err, req, res, next) => {
  console.error('Server Error:', err.message)
  res.status(500).json({ error: 'Internal Server Error' })
})
// Route to sync the database
app.post('/sync-db', async (req, res) => {
  try {
    const result = await syncDB()

    if (result.success) {
      res.status(200).json({
        message: result.message,
        tables: result.tables
      })
    } else {
      res.status(500).json({
        message: result.message,
        error: result.error
      })
    }
  } catch (error) {
    console.error('Failed to sync database:', error)
    res.status(500).send('Failed to sync database')
  }
})
app.use(bodyParser.json())
// Connect to PostgreSQL and sync database
sequelize
  .authenticate()
  .then(() => {
    console.log(
      'Connection to the database has been established successfully.'
    )
    // Sync database after successful connection
    // return syncDB();
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/api-docs`)
})
