import express from "express"
import cors from 'cors'
import itemRoutes from './routes/itemRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: 'API is running!' });
});

app.use('/api/items', itemRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use(errorHandler);

export default app