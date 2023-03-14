export interface ICategoryInput {
  name: string;
  parentId?: string;
}

export interface IUpdateCategoryInput {
  active: boolean;
}

export interface ICategory extends ICategoryInput {
  id: string;
  active: boolean;
  slug: string;
  createdAt: string;
}
