import { LoginPage } from "./LoginPage";
import {DashboardPage} from "./DashboardPage";
import {CartPage} from "./CartPage";
import {OrdersReviewPage} from "./OrdersReviewPage";
import {OrderHistoryPage} from "./OrderHistoryPage";
import {Page} from '@playwright/test';

export class POManager{

    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    cartPage: CartPage;
    ordersReviewPage: OrdersReviewPage;
    orderHistoryPage: OrderHistoryPage;
    page: Page;
  


    constructor(page: Page)
    {
        this.page = page;
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
