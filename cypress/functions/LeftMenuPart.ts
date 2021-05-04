import { NavigationLocators } from "../resourses/WebElements";


//Functions for use to navigate to specific page

export function goToProductPage(): void {
	cy.get(NavigationLocators.CatalogMenu).click();
	cy.get(NavigationLocators.ProductsSubMenu).click();

}

export function goToCategoriesPage(): void {
	cy.get(NavigationLocators.CatalogMenu).click();
	cy.get(NavigationLocators.CategoriesSubMenu).click();

}