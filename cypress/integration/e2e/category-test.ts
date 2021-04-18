import * as AddCategoryPage from '../../functions/AddCategoryPage';
import * as CategoriesPage from '../../functions/CategoriesPage';
import * as LeftMenuPart from '../../functions/LeftMenuPart';
import * as ProductPage from '../../functions/ProductPage';
import * as AddProductPage from '../../functions/AddProductPage';
import { Category } from '../../resourses/models/Category';
import { Product } from '../../resourses/models/Product';

function createCategory(name: string, metaTag: string, parent: string) {
    LeftMenuPart.goToCategoriesPage();
    CategoriesPage.goToAddCategoryPage();
    AddCategoryPage.fillGeneralTab({
        megaTag: metaTag,
        categoryName: name
    });
    AddCategoryPage.clickDataTab();
    AddCategoryPage.selectCategoryParent(parent);
    AddCategoryPage.checkTopCheckBox();
    AddCategoryPage.saveAddedCategory();

}
describe('Category creation', () => {

    describe('Adding new category', () => {


        const category: Category = {
            name: 'Routers',
            megaTag: "routers",
            parent: 'Components'

        };

        const product: Product = {
            name: 'TOMEN200',
            metaTag: 'nout',
            model: 'JK',
            categories: [category.name, 'Components']

        };


        before(() => {

            cy.loginByApi();
        });

        beforeEach(() => {

            cy.database('deleteData', 'oc_category_description', category.name);
            cy.database('deleteData', 'oc_product_description', product.name);
            Cypress.Cookies.preserveOnce(Cypress.env("session_id"));
        });

        it('When all mandatory fields are filled, success message is displayed', () => {
            createCategory(category.name, category.megaTag, category.parent);

            CategoriesPage.assertSuccessMessageDisplayed();
        });

        it('When category is created, should create product with that category', () => {
            createCategory(category.name, category.megaTag, category.parent);

            LeftMenuPart.goToProductPage();
            ProductPage.gotoAddProductPage();
            AddProductPage.typeProductName(product.name);
            AddProductPage.typeMegaTagTitle(product.metaTag);
            AddProductPage.clickDataTab();
            AddProductPage.typeModel(product.model);
            AddProductPage.clickLinksTab();
            AddProductPage.typeCategories(product.categories);
            AddProductPage.saveAddedProduct();

            CategoriesPage.assertSuccessMessageDisplayed();
        });
    });
});