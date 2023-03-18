const OrderModel = require('../models/order')


class Order {
    constructor(customer) {
        this.customer = customer;
        this.items = [];
        this.total =  this.calculateTotal(),
        this.status = false;
        this.id =  Math.floor(Math.random() * 10000);
    }

    async save() {
        const orderData = {
            customer: { sessionId: this.customer} ,
            items: this.items,
            totalCost: this.calculateTotal(),
            status: this.status,
            id: this.id
        };
        const order = new OrderModel(orderData);
        await order.save();
    }

    addItem(Item) {
        this.items.push(Item);
    }

    calculateTotal() {
        let total = 0;
        this.items.forEach(item => {
           
            total += Number(item[1]);
        });
       
        return total;
    }

    getOrderDetails() {
        const orderItems = this.items;
        return { items: orderItems, total: this.calculateTotal()};
    }
}

module.exports = Order;
