import { ProductPageLocators } from "../resourses/WebElements";


//Functions for use in Product Page

export function gotoAddProductPage(): void {
    cy.get(ProductPageLocators.Add_Product_Button).click();

}
export function assertSuccessMessageDisplayed(): void {
    cy.wait('@addedProduct');
    cy.get(ProductPageLocators.Success_Message).should('be.visible');
}