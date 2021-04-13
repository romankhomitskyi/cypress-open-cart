

export enum HeaderLocators {
    Logo = '#header-logo'

}

export enum NavigationLocators {
    CatalogMenu = '#menu-catalog',
    ProductsSubMenu = '#collapse1 > li:nth-child(2) > a',
    CategoriesSubMenu = '#collapse1 > li:nth-child(1) > a'

}

export enum ProductPageLocators {
    Add_Product_Button = '.fa-plus',
    Success_Message = '.alert-success'
}


export enum AddProductPageLocators {
    ProductNameField = '#input-name1',
    Meta_Tag_TitleField = '#input-meta-title1',
    DataTab = '[href = "#tab-data"]',
    ModelField = '#input-model',
    LinksTab = '[href = "#tab-links"]',
    CategoriesField = '#input-category',
    CategoriesDropDown = '.dropdown-menu',
    ProductCategoryContainer = '#product-category',
    MinusProductCategoryButton = '.fa-minus-circle',
    Save_Product_Button = '.fa-save'

}

export enum CategoriesPageLocators {
    Add_Category_Button = '.fa-plus',
    Success_Message = '.alert-success'
}

export enum AddCategoryPageLocators {
    CategoryNameField = '#input-name1',
    MetaTagTitleField = '#input-meta-title1',
    DataTab = '[href = "#tab-data"]',
    ParentField = '#input-parent',
    ParentsDropDown = '.dropdown-menu',
    TopCheckBox = '#input-top',
    SaveCategoryButton = '.fa-save'

}

