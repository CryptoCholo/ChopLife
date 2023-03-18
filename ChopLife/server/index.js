require('dotenv').config();
const session = require('express-session');
const express = require("express");
const app = express();
const http = require("http");
const path = require('path');
const Restaurant = require('./services/restaurant');
const moment = require('moment')

const server = http.createServer(app);
const {connect} = require('./db/db');
const mongooseStore = require('connect-mongo');

//Initialize socket.io
const { Server } = require("socket.io");
const io = new Server(server);

//connect to mongo atlas
connect();


app.use(express.static(path.resolve(__dirname, '../dist')));




const store =  mongooseStore.create({mongoUrl: process.env.MONGO_URL})


const sesh = {
  name: "sessionId",
  secret: process.env.SESSION,
  resave: true,
  saveUninitialized: true,
  store: store,
  cookie: {
    name: "sessionId",
    maxAge: 604800000,//number of milliseconds in a week
    secure: false 
  },
}

if (process.env.NODE_ENV === 'production') {
  sesh.cookie.secure = true;
  sesh.cookie.httpOnly = true;
}

//configure session option
const sessionMiddleware = session(sesh)

io.engine.use(sessionMiddleware);

app.get("/", (req, res) => {

 
  var options = {
    root: path.join(__dirname, '../dist'),
  }
 
  res.sendFile("/index.html", options);
});

const restaurant = new Restaurant();

io.on("connection", (socket) => {

  const sessionId = socket.request.session.id;

  socket.on('input_error', (event) => {
    console.log(event)
    socket.emit('menu', {namE:  "chatBot", bodY: " Oops! Your response is Invalid. Please respond with a valid input.", timE: `${moment().toLocaleString().split(' ')[4]}`,})
  })
 
  socket.on('showmenu', (event) => {
    socket.emit('welcome', {namE:  "chatBot", bodY: "Welcome to CHOPLIFE RESTAURANT. Please reply with any of the numbers in our options menu to continue.", timE: `${moment().toLocaleString().split(' ')[4]}`,})
  })

  socket.on('place_order', (event) => {
    restaurant.createOrder(sessionId)
    const menu = restaurant.getMenu();
    menu.forEach(item => {
      socket.emit('menu', {namE:  "chatBot", bodY: item, timE: `${moment().toLocaleString().split(' ')[4]}`,});
    }) 
  })

  socket.on('option_selected', async (event) => {
    const msg = await  restaurant.addOrderItem(event.bodY);
     socket.emit('menu', {namE:  "chatBot", bodY: msg, timE: `${moment().toLocaleString().split(' ')[4]}`,});
  })


  socket.on('cont_inue', (event) => {
    const menu = restaurant.getMenu();
    menu.forEach(item => {
      socket.emit('menu', {namE:  "chatBot", bodY: item, timE: `${moment().toLocaleString().split(' ')[4]}`,});
    }) 
  })

  socket.on('order_history', async (event) => {
    const history = await restaurant.getOrderHistory(sessionId);
    history.forEach(order => {
      order.items.forEach(oi => {
        let orderItem = `Item: ${oi[0]} - $${oi[1]}`;
        socket.emit('menu', {namE:  "chatBot", bodY: orderItem, timE: `${moment().toLocaleString().split(' ')[4]}`});
        })
      let  ordeR = `Order Id: ${order.id};  Total:  $${order.totalCost};`
       socket.emit('menu', {namE:  "chatBot", bodY: ordeR, timE: `${moment().toLocaleString().split(' ')[4]}`});
    })
  })

  socket.on('current_order', (event) => {
   const order = restaurant.getCurrentOrder();
   if (order) {
    order.items.forEach(item => {
      const it = `${item[0]} - $${item[1]}`
      socket.emit('current_order', {namE:  "chatBot", bodY: it, timE: `${moment().toLocaleString().split(' ')[4]}`});
     })
     socket.emit('total', {namE:  "chatBot", bodY: `Total - $${order.total}`, timE: `${moment().toLocaleString().split(' ')[4]}`})
   } else {
    socket.emit('current_order', {namE:  "chatBot", bodY: "You dont have any open orders. Reply 1 to create a new order.", timE: `${moment().toLocaleString().split(' ')[4]}`});
   }
  })


  socket.on('checkout_order', async (event) => {
    const message = await restaurant.checkoutOrder();
    socket.emit('checkout', {namE:  "chatBot", bodY: message, timE: `${moment().toLocaleString().split(' ')[4]}`})
  })

  socket.on('cancel_order', (event) => {
    const msg = restaurant.cancelOrder();
    socket.emit('order_cancelled', {namE:  "chatBot", bodY: msg, timE: `${moment().toLocaleString().split(' ')[4]}`})
  })

  socket.on('grilled_options', (event) => {
    const menu = restaurant.getGrilledMenu();
    menu.forEach(item => {
      socket.emit('menu', {namE:  "chatBot", bodY: item, timE: `${moment().toLocaleString().split(' ')[4]}`,});
    }) 
  })

  socket.on('peppersoup_options', (event) => {
    const menu = restaurant.getSoupMenu();
    menu.forEach(item => {
      socket.emit('menu', {namE:  "chatBot", bodY: item, timE: `${moment().toLocaleString().split(' ')[4]}`,});
    }) 
  })

  socket.on('sides_options', (event) => {
    const menu = restaurant.getSideMenu();
    menu.forEach(item => {
      socket.emit('menu', {namE:  "chatBot", bodY: item, timE: `${moment().toLocaleString().split(' ')[4]}`,});
    }) 
  })

  socket.on('beverage_options', (event) => {
    const menu = restaurant.getBeverageMenu();
    menu.forEach(item => {
      socket.emit('menu', {namE:  "chatBot", bodY: item, timE: `${moment().toLocaleString().split(' ')[4]}`,});
    }) 
  })
  
  socket.on("user_connected", (e) => {
    socket.emit("user_connected_successful", `${e.info} connected successfully`);
  })    
})

server.listen(process.env.PORT, () => {
  console.log("listening on *:4000");
})