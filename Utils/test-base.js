const base = require('@playwright/test');

//the type comment tells the editor (// @ts-check) that tests get a testDataForOrder fixture
/** @type {import('@playwright/test').TestType<import('@playwright/test').PlaywrightTestArgs & import('@playwright/test').PlaywrightTestOptions & {testDataForOrder: {username: string, password: string, productName: string}}, import('@playwright/test').PlaywrightWorkerArgs & import('@playwright/test').PlaywrightWorkerOptions>} */
exports.test = base.test.extend(
    {
        testDataForOrder:
        {
            username : "nidhiagrawal531@gmail.com",
            password:  "Test@1234",
            productName: "ZARA COAT 3"
        }
    }
)
