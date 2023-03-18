const Menu = require('./menu');
const Order = require('./order');
const OrderModel = require('../models/order');




class Restaurant {
    constructor() {
        this.menu = new Menu();
        this.order = false;
        this.orderHistory = [];
    }

  

    getMenu() {
        return this.menu.getMenu();
    }

    getGrilledMenu() {
        return this.menu.getGrilledMenu();
    }

    getSoupMenu() {
        return this.menu.getSoupMenu();
    }

    getSideMenu() {
        return this.menu.getSideMenu();
    }
    getBeverageMenu() {
        return this.menu.getBeverageMenu();
    }

    createOrder(sessionId) {
         this.order = new Order(sessionId);
         return this.order.id;
    }

    async addOrderItem(input) {
        if (this.order) {
            let item = this.menu.index[input]
            this.order.addItem(item)
            return  'Option has been added to your order. Reply 2 to continue or 99 to checkout'
        }
       return "Reply 1 to create a new order";
    }

    getCurrentOrder() {
        if (!this.order) {
            return false;
        }
        return this.order.getOrderDetails();
    }

    async  checkoutOrder() {
        if (!this.order) {
            return "No Order to checkout. Reply 1 to create a new order";
        }
       this.order.status = true;
       this.orderHistory.push(this.order);
        await this.order.save();
        let id = this.order.id;
        this.order = false;
        return  `Order Checkout was succesful. Your Order Id : ${id}`;
    }

    async getOrderHistory(sessionId) { 
        const order = await OrderModel.find({customer: { sessionId }});
        return order;

    }

    cancelOrder() {
         this.order = false;
         return "Your Order has been cancelled"
    }
}

module.exports = Restaurant;