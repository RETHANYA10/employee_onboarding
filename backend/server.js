const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const employeesRouter = require('./src/routes/employees');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/employees', employeesRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
