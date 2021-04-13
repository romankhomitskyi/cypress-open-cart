import * as AddProductPage from "../../functions/AddProductPage";
import * as LeftMenuPart from "../../functions/LeftMenuPart";
import * as ProductPage from "../../functions/ProductPage";
const newProduct = require('../../fixtures/new-product.json');


describe('Manage product test', () => {

    before(() => {
        cy.loginByApi();
        cy.database('deleteData', 'oc_product_description', newProduct.productName);
    });
    it('should add new product', () => {

        LeftMenuPart.goToProductPage();
        ProductPage.gotoAddProductPage();
        AddProductPage.typeProductName(newProduct.productName);
        AddProductPage.typeMegaTagTitle(newProduct.megaTag);
        AddProductPage.clickDataTab();
        AddProductPage.typeModel(newProduct.model);
        AddProductPage.clickLinksTab();
        AddProductPage.typeCategories(newProduct.category);
        AddProductPage.saveAddedProduct();

        //Assertion
        ProductPage.assertSuccessMessageDisplayed();

    });
});
