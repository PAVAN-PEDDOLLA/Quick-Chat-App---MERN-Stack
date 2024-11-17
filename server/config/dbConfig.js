const mongoose = require('mongoose');
//Connection Logic
mongoose.connect(process.env.CONN_STRING)
//Connection State
const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB');
})
db.on('err', () => {
    console.log('Error connecting to MongoDB');
})
module.exports = db;