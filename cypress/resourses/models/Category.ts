import { AddCategoryPageLocators } from '../WebElements';


export type GeneralTabData = {
    categoryName: string,
    megaTag: string;
};

export type GeneralTabLocators = {
    [Property in keyof GeneralTabData]: AddCategoryPageLocators;
};

export const generalTabLocators: GeneralTabLocators = {
    categoryName: AddCategoryPageLocators.CategoryNameField,
    megaTag: AddCategoryPageLocators.MetaTagTitleField,
};
