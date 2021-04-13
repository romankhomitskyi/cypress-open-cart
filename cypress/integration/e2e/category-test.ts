import * as AddCategoryPage from '../../functions/AddCategoryPage';
import * as CategoriesPage from '../../functions/CategoriesPage';
import * as LeftMenuPart from '../../functions/LeftMenuPart';
import * as ProductPage from '../../functions/ProductPage';

const newCategory = require('../../fixtures/new-category.json');


describe('Manage categories', () => {
    beforeEach(() => {
        cy.loginByApi();
        cy.database('deleteData', 'oc_category_description', newCategory.categoryName);
    });

    it('should add new category', () => {
        LeftMenuPart.goToCategoriesPage();
        CategoriesPage.goToAddCategoryPage();
        AddCategoryPage.fillGeneralTab({
            megaTag: 'dada',
            categoryName: 'd1231'
        });
    });
});