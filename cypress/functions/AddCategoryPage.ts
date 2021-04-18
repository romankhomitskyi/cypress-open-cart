import { GeneralTabData, generalTabLocators } from '../resourses/models/Category';
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

