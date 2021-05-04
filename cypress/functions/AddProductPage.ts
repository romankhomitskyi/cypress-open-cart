import { type } from '../../node_modules/cypress/types/jquery/index';
import { AddProductPageLocators } from "../resourses/WebElements";

//Functions for use in Add Product Page


export function typeProductName(productName: string): void {
	cy.get(AddProductPageLocators.ProductNameField)
		.type(productName);
}

export function typeMegaTagTitle(megaTagTitle: string): void {
	cy.get(AddProductPageLocators.Meta_Tag_TitleField)
		.type(megaTagTitle);
}

export function clickDataTab(): void {
	cy.get(AddProductPageLocators.DataTab)
		.click();
}

export function typeModel(model: string): void {
	cy.get(AddProductPageLocators.ModelField)
		.type(model);
}

export function clickLinksTab(): void {
	cy.get(AddProductPageLocators.LinksTab)
		.click();
}

export function typeCategories(categories: string | string[]): void {
	if (Array.isArray(categories)) {
		categories.forEach(category => {

			cy.intercept({
				method: 'GET',
				url: `/${Cypress.env('adminUrl')}`,
				query: {
					route: 'catalog/category/autocomplete',

				}
			}).as('getCategories');
			// { fixture: 'categories' }
			cy.get(AddProductPageLocators.CategoriesField)
				.click()
				.clear()
				.type(category);


			cy.wait('@getCategories');
			cy.contains(AddProductPageLocators.CategoriesDropDown, category)
				.should('be.visible')
				.click();



		});
	} else {
		cy.get(AddProductPageLocators.CategoriesField)
			.click()
			.clear()
			.type(categories);

		cy.contains(AddProductPageLocators.CategoriesDropDown, categories)
			.should('be.visible')
			.click();


	}

}

export function saveAddedProduct(): void {
	cy.intercept({
		method: 'POST',
		url: `/${Cypress.env('adminUrl')}`,
		query: {
			route: 'catalog/product/add'

		}
	}).as('addedProduct');
	cy.get(AddProductPageLocators.Save_Product_Button)
		.click();
}

