const { expect } = require('@playwright/test');

class APIUtils {

    constructor(apiContext, loginPayload)
{
    //new instance variable for apiContext
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;

}

   async getToken()
    {
        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
        {
            data: this.loginPayload
        });

        expect(loginResponse.ok()).toBeTruthy();
        const loginResponseBody = await loginResponse.json();
        const token = loginResponseBody.token;
        console.log(token);
        return token;
    }

    async createOrder(orderPayload)
    {
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
        data: orderPayload,
        headers: {
                    'Authorization': response.token,
                    'Content-Type': 'application/json',

                }
        });

        let orderResponseJson = await orderResponse.json();
        response.orderId = orderResponseJson.orders[0];
        console.log(response.orderId);
        return response;
    }
}

module.exports = { APIUtils };
