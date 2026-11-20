Feature: Ecommerce Validations

@Regression
  Scenario: Placing the Order
    Given a login to Ecommerce application with "nidhiagrawal531@gmail.com" and "Test@1234"
    When Add "ZARA COAT 3" to Cart
    Then Verify "ZARA COAT 3" is displayed in the Cart
    When Enter valid details and Place the Order
    Then Verify the order is present in OrderHistory
