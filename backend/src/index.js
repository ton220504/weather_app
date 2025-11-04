const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const weatherRoute = require('./routes/weatherRoutes');

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/weather', weatherRoute);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log("✅ Server running on port", PORT));