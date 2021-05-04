import { CategoryApi, GeneralTabData, generalTabLocators } from '../resourses/models/Category';
import { AddCategoryPageLocators } from '../resourses/WebElements';



function isString(value: string | null | undefined): value is string {
	return typeof value === "string";
}



export function clickDataTab(): void {
	cy.get(AddCategoryPageLocators.DataTab)
		.click();
}

export function selectCategoryParent(categoryParent: string): void {
	if (isString(categoryParent)) {
		cy.get(AddCategoryPageLocators.ParentField)
			.click();
		cy.contains(AddCategoryPageLocators.ParentsDropDown, categoryParent)
			.should('be.visible')
			.click();
	}
}

export function checkTopCheckBox(): void {
	cy.get(AddCategoryPageLocators.TopCheckBox)
		.check();
}

export function createCategoryByApi(category: CategoryApi, token: JQuery<HTMLElement>): Cypress.Chainable<Cypress.Response> {
	const ctx: CategoryApi = { ...category };


	if ('top' in ctx) {
		ctx.top = Boolean(ctx.top);
	}

	if ('path' in ctx && ctx.path) {
		cy.database('getCategoryParentId', ctx.path).then(result => {
			ctx.parent_id = result[0]?.category_id;
		});
	}

	return cy.request({
		method: 'POST',
		followRedirect: false,
		form: true,
		url: `/${Cypress.env("adminUrl")}`,
		body: ctx,
		qs: {
			route: 'catalog/category/add',
			user_token: token,
		}
	});
}


export function fillGeneralTab(generalTabData: Partial<GeneralTabData>) {
	const keys = Object.keys(generalTabData) as Array<keyof GeneralTabData>;

	if (!keys.length) return;

	keys.forEach((key) => {
		const locator = generalTabLocators[key];
		const value = generalTabData[key];
		if (locator && isString(value)) {

			cy.get(locator)
				.type(value);
		}
	});
}

export function saveAddedCategory(): void {
	cy.intercept({
		method: 'POST',
		url: `/${Cypress.env('adminUrl')}`,
		query: {
			route: 'catalog/category/add'

		}
	}).as('addedCategory');
	cy.get(AddCategoryPageLocators.SaveCategoryButton)
		.click();
}

