import { CategoriesPageLocators } from '../resourses/WebElements';

//Functions for use in Categories Page

export function goToAddCategoryPage(): void {
	cy.get(CategoriesPageLocators.Add_Category_Button).click();
}
export function assertSuccessMessageDisplayed(): void {
	cy.wait('@addedCategory');
	cy.get(CategoriesPageLocators.Success_Message).should('be.visible');
}