import * as AddCategoryPage from '../../functions/AddCategoryPage';
import * as CategoriesPage from '../../functions/CategoriesPage';
import * as LeftMenuPart from '../../functions/LeftMenuPart';
import * as ProductPage from '../../functions/ProductPage';
import * as AddProductPage from '../../functions/AddProductPage';
import { Category, CategoryApi } from '../../resourses/models/Category';
import { Product } from '../../resourses/models/Product';

describe('Category creation', () => {

	describe('Adding new category', () => {

		// Data for Category creation
		const category: Category = {
			name: 'Routers',
			megaTag: "routers",
			parent: 'Components'

		};

		// Data for Product creation
		const product: Product = {
			name: 'TOMEN200',
			metaTag: 'nout',
			model: 'JK',
			categories: [category.name, 'Components']

		};

		let token: JQuery<HTMLElement>;

		before(() => {

			//Setup
			cy.loginByApi();

			// Getting token after login
			cy.get('@token1').then(givenToken => {
				token = givenToken;
			});
		});

		beforeEach(() => {

			//Clean up
			cy.database('deleteData', category.name, 'oc_category_description');
			cy.database('deleteData', product.name, 'oc_product_description');
			Cypress.Cookies.preserveOnce(Cypress.env("session_id"));

		});

		it('When all mandatory fields are filled, success message is displayed', () => {

			//Act
			LeftMenuPart.goToCategoriesPage();
			CategoriesPage.goToAddCategoryPage();

			AddCategoryPage.fillGeneralTab({
				megaTag: category.megaTag,
				categoryName: category.name
			});

			AddCategoryPage.clickDataTab();
			AddCategoryPage.selectCategoryParent(category.parent);
			AddCategoryPage.checkTopCheckBox();
			AddCategoryPage.saveAddedCategory();

			//Assertion
			CategoriesPage.assertSuccessMessageDisplayed();
		});

		it('When category is created, should create product with that category', () => {

			// Request to create category ahead of time
			const newCategory: CategoryApi = {
				"category_description[1][name]": category.name,
				"category_description[1][meta_title]": category.megaTag,
				path: category.parent,
				top: true
			};

			//Act
			AddCategoryPage.createCategoryByApi(newCategory, token);

			LeftMenuPart.goToProductPage();
			ProductPage.gotoAddProductPage();
			AddProductPage.typeProductName(product.name);
			AddProductPage.typeMegaTagTitle(product.metaTag);
			AddProductPage.clickDataTab();
			AddProductPage.typeModel(product.model);
			AddProductPage.clickLinksTab();
			AddProductPage.typeCategories(product.categories);
			AddProductPage.saveAddedProduct();

			//Assertion
			ProductPage.assertSuccessMessageDisplayed();
		});
	});
});


