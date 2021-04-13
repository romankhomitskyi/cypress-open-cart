import { CategoriesPageLocators } from '../resourses/WebElements';

export const CategoriesPage = {
    goToAddCategoryPage(): void {
        cy.get(CategoriesPageLocators.Add_Category_Button).click();
    },

    assertSuccessMessageDisplayed(): void {
        cy.wait('@addedCategory');
        cy.get(CategoriesPageLocators.Success_Message).should('be.visible');
    }
};
export function goToAddCategoryPage(): void {
    cy.get(CategoriesPageLocators.Add_Category_Button).click();
}
export function assertSuccessMessageDisplayed(): void {
    cy.wait('@addedCategory');
    cy.get(CategoriesPageLocators.Success_Message).should('be.visible');
}