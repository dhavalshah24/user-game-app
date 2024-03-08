const express = require('express');
require('dotenv').config();
const db = require('./config/db');
const apiRoutes = require('./routes/v1')

const app = express();
app.use(express.json());

app.use('/api/v1', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
