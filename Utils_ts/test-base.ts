import {test as baseTest} from '@playwright/test';
interface TestDataForOrder {

    username : string;
    password: string;
    productName: string;
};
export const customTest = baseTest.extend<{testDataForOrder: TestDataForOrder}>(
    {
        testDataForOrder:
        {
            username : "nidhiagrawal531@gmail.com",
            password:  "Test@1234",
            productName: "ZARA COAT 3"
        }
    }
)

