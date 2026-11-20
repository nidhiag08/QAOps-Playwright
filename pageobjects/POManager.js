const { LoginPage } = require('./LoginPage');
const { DashboardPage } = require('./DashboardPage');
const { CartPage } = require('./CartPage');
const { OrdersReviewPage } = require('./OrdersReviewPage');
const { OrderHistoryPage } = require('./OrderHistoryPage');

class POManager{

    constructor(page)
    {
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.ordersReviewPage = new OrdersReviewPage(page);
        this.orderHistoryPage = new OrderHistoryPage(page);
    }

    getLoginPage()
    {
        return this.loginPage;
    }

    getDashboardPage()
    {
        return this.dashboardPage;
    }

    getCartPage()
    {
        return this.cartPage;
    }

    getOrdersReviewPage()
    {
        return this.ordersReviewPage;
    }

    getOrderHistoryPage()
    {
        return this.orderHistoryPage;
    }
}

module.exports = {POManager};
