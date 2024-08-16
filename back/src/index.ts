import express, { Request, Response } from 'express';
import cors from 'cors';
import db from './models';
import dotenv from 'dotenv';
import { adminAutoCreate } from './helpers/adminAutoCreate';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import ingredientRoutes from './routes/ingredientRoutes'; 
import recipeRoutes from './routes/recipeRoutes'; 
import postRoutes from './routes/postRoutes'; 
import commentRoutes from './routes/commentRoutes'; 



dotenv.config(); 

// Automatically create admin user (if needed)
adminAutoCreate();

// Initialize Express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes); 
app.use('/user', userRoutes);
app.use('/ing', ingredientRoutes); 
app.use('/recipe',recipeRoutes); 
app.use('/posts', postRoutes);
app.use('/comment', commentRoutes);

// Ensure PORT is defined
const PORT = process.env.PORT;
if (!PORT) {
  throw new Error('PORT environment variable is not set');
}

// Sync database and start the server
db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Database synchronized successfully.');
    adminAutoCreate();
    app.listen(PORT, () => {
      console.log(`Express is listening at http://localhost:${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error('Error synchronizing the database:', err);
  });
