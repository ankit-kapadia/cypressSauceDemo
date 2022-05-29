
import locatorValue from "../../helpers/objectRepo.json";

describe('Test Suite', () => {
    beforeEach(function () {
        cy.clearCookies();
        cy.visit(Cypress.env("url"));
    });

    it('Login Test', () => {
        cy.login(Cypress.env("user_name"), Cypress.env("password"));
        cy.get(locatorValue['homePagePrductTitle']).should('have.text', 'Products');
        cy.get(locatorValue['homePageBag']).should('exist');
        cy.get(locatorValue['swagFooterImage']).should('exist');
    });

    it('Negative Login Test', () => {
        //Hardcoding the password as its a negative testcase
        cy.login(Cypress.env("user_name"), "123456");
        cy.get(locatorValue['loginPageErrorMessage']).should('have.text', 'Epic sadface: Username and password do not match any user in this service');
        cy.get(locatorValue['homePageBag']).should('not.exist');
        cy.get(locatorValue['swagFooterImage']).should('not.exist');
    });

    it('Add To Cart & Cart Page Test', () => {
        cy.login(Cypress.env("user_name"), Cypress.env("password"));
        cy.get(locatorValue['homePageBag']).click();
        cy.get(locatorValue['homePageCartIcon']).should('have.text', '1');
        cy.get(locatorValue['addCartLink']).click();
        cy.get(locatorValue['cartPageFirstItem']).should('have.text', 'Sauce Labs Backpack');
        cy.get(locatorValue['cartPageQuantityParent']).parent().parent().get(locatorValue['cartPageQantityChild']).should('have.text', '1');
        cy.get(locatorValue['cartPagePriceParent']).parent().get(locatorValue['cartPagePriceChild']).should('have.text', '$29.99');
    });

    it('Place Order', () => {
        cy.login(Cypress.env("user_name"), Cypress.env("password"));
        cy.get(locatorValue['homePageBag']).click();
        cy.get(locatorValue['addCartLink']).click();
        cy.contains('button', locatorValue['cartPageCheckoutLinkText']).click();
        cy.get(locatorValue['checkoutPageTitle']).should('have.text', 'Checkout: Your Information');
        cy.get(locatorValue['checkoutPageFirstName']).type('testfirstname');
        cy.get(locatorValue['checkoutPageLastName']).type('testlastname');
        cy.get(locatorValue['checkoutPagePostalCode']).type('123456');
        cy.get(locatorValue['checkoutPageContinueButton']).click();
        cy.get(locatorValue['reviewPageTitle']).should('have.text', 'Checkout: Overview');
        cy.get(locatorValue['cartPageFirstItem']).should('have.text', 'Sauce Labs Backpack');
        cy.get(locatorValue['cartPageQuantityParent']).parent().parent().get(locatorValue['cartPageQantityChild']).should('have.text', '1');
        cy.get(locatorValue['cartPagePriceParent']).parent().get(locatorValue['cartPagePriceChild']).should('have.text', '$29.99');
        // cy.get('div[class="summary_info_label"]').should('have.text', 'Shipping Information:');
        cy.get(locatorValue['reviewPageSubTotal']).invoke('text').then((text) => {
            var itemAmt = text.split('$')[1];
            cy.get(locatorValue['reviewPageTax']).invoke('text').then((text) => {
                var taxAmt = text.split('$')[1];
                cy.get(locatorValue['reviewPageTotal']).invoke('text').then((text) => {
                    var totalAmt = text.split('$')[1];
                    var expectedTotalAmt = parseFloat(itemAmt) + parseFloat(taxAmt);
                    expect(parseFloat(expectedTotalAmt)).equal(parseFloat(totalAmt.trim()));
                    cy.contains('button', locatorValue['reviewPageFinishButtonText']).click();
                    cy.get(locatorValue['successPageTitle']).should('have.text', 'THANK YOU FOR YOUR ORDER');
                    cy.contains('button', locatorValue['successPageBackHomeText']).click();
                });
            });
        });
    });

    it('Add Remove multiple items Cart Home Page Test', () => {
        cy.login(Cypress.env("user_name"), Cypress.env("password"));
        cy.get(locatorValue['homePageBag']).click();
        cy.get(locatorValue['homePageCartIcon']).should('have.text', '1');
        cy.get(locatorValue['homePageBikeLight']).click();
        cy.get(locatorValue['homePageCartIcon']).should('have.text', '2');
        cy.get(locatorValue['homePageFleeceJacket']).click();
        cy.get(locatorValue['homePageCartIcon']).should('have.text', '3');
        cy.get(locatorValue['homePageBikeLightRemove']).click();
        cy.get(locatorValue['homePageCartIcon']).should('have.text', '2');
    });

    it('Add Remove multiple items Cart Page Test', () => {
        cy.login(Cypress.env("user_name"), Cypress.env("password"));
        cy.get(locatorValue['homePageBag']).click();
        cy.get(locatorValue['homePageFleeceJacket']).click();
        cy.get(locatorValue['homePageCartIcon']).should('have.text', '2');
        cy.get(locatorValue['addCartLink']).click();
        cy.get(locatorValue['cartPageFirstItem']).should('have.text', 'Sauce Labs Backpack');
        cy.get(locatorValue['cartPageSecondItem']).should('have.text', 'Sauce Labs Fleece Jacket');
        cy.get(locatorValue['cartPageThirdItem']).should('not.exist');
        cy.get(locatorValue['homePageCartIcon']).should('have.text', '2');
        cy.get(locatorValue['homePageBagRemove']).click();
        cy.get(locatorValue['homePageCartIcon']).should('have.text', '1');
        cy.get(locatorValue['cartPageFirstItem']).should('not.exist');
    });
})