import * as AddProductPage from "../../functions/AddProductPage";
import * as LeftMenuPart from "../../functions/LeftMenuPart";
import * as ProductPage from "../../functions/ProductPage";
import { Product } from '../../resourses/models/Product';


describe('Product creation', () => {

    describe('Adding new product', () => {


        const product: Product = {
            name: 'TOMEN200',
            metaTag: 'nout',
            model: 'JK',
            categories: ['Cameras', 'Components']

        };

        before(() => {
            //Setup
            cy.loginByApi();
            cy.database('deleteData', 'oc_product_description', product.name);

        });

        it('When all mandatory fields are filled, success message is displayed', () => {

            //Act
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
