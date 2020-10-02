const express = require('express');
const connectDB = require('./config/db');


const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
  socket.on('joinChat', () => {
    socket.emit('message', 'Remember, all payments must be made in Popde, to make sure youre covered by Depop Protection.')
  })

  // Listen for chatMessage
  socket.on('sendMessage', msg => {
    console.log(msg)

    io.emit('message', msg)
  });
});

// connect database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }))

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/products', require('./routes/api/products'));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));