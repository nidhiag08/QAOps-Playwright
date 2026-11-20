Feature: Ecommerce Validations

@Regression
  Scenario: Placing the Order
    Given a login to Ecommerce application with "nidhiagrawal531@gmail.com" and "Test@1234"
    When Add "ZARA COAT 3" to Cart
    Then Verify "ZARA COAT 3" is displayed in the Cart
    When Enter valid details and Place the Order
    Then Verify the order is present in OrderHistory

  @Validation
  Scenario Outline: Login with "<username>" gives <result>
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify login result is "<result>"

    Examples:
      | username           | password          | result  |
      | rahulshettyacademy | Learning@830$3mK2 | success |
      | wronguser@test.com | WrongPass@123     | error   |
