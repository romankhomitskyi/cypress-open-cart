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

export interface Category {
  name: string;
  megaTag: string;
  parent: string;
}

export interface CategoryApi {
  "category_description[1][name]": string,
  "category_description[1][meta_title]": string,
  "path"?: string,
  "parent_id"?: number,
  "top"?: boolean;

}
