import * as AddCategoryPage from '../../functions/AddCategoryPage';
import * as CategoriesPage from '../../functions/CategoriesPage';
import * as LeftMenuPart from '../../functions/LeftMenuPart';
import * as ProductPage from '../../functions/ProductPage';
import * as AddProductPage from '../../functions/AddProductPage';
import { Category } from '../../resourses/models/Category';
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

            cy.loginByApi();

            // Getting token after login
            cy.get('@token1').then(givenToken => {
                token = givenToken;
            });
        });

        beforeEach(() => {

            cy.database('deleteData', 'oc_category_description', category.name);
            cy.database('deleteData', 'oc_product_description', product.name);
            Cypress.Cookies.preserveOnce(Cypress.env("session_id"));
        });

        it('When all mandatory fields are filled, success message is displayed', () => {
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

            CategoriesPage.assertSuccessMessageDisplayed();
        });

        it('When category is created, should create product with that category', () => {

            // Request to create category ahead of time
            cy.request({
                method: 'POST',
                followRedirect: false,
                form: true,
                url: `/${Cypress.env("adminUrl")}`,
                body: {
                    "category_description[1][name]": "Routers",
                    "category_description[1][meta_title]": "routers",
                    "path": "Components",
                    "parent_id": "25",
                    "top": "1"

                },
                qs: {
                    route: 'catalog/category/add',
                    user_token: token,
                }
            });



            LeftMenuPart.goToProductPage();
            ProductPage.gotoAddProductPage();
            AddProductPage.typeProductName(product.name);
            AddProductPage.typeMegaTagTitle(product.metaTag);
            AddProductPage.clickDataTab();
            AddProductPage.typeModel(product.model);
            AddProductPage.clickLinksTab();
            AddProductPage.typeCategories(product.categories);
            AddProductPage.saveAddedProduct();

            ProductPage.assertSuccessMessageDisplayed();
        });
    });
});