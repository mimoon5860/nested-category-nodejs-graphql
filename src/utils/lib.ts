import { ICategory } from "./types";

class Lib {
  // filter all category hierarchically
  public static filterCategory(categories: ICategory[], parentId?: string) {
    const allCategories: any = [];
    let category;
    if (!parentId) {
      category = categories.filter((cate: any) => cate.parentId === undefined);
    } else {
      category = categories.filter((cate: any) => cate.parentId === parentId);
    }

    category.forEach((cate: any) => {
      allCategories.push({
        _id: cate._id,
        name: cate.name,
        slug: cate.slug,
        active: cate.active,
        parentId: cate.parentId,
        children: this.filterCategory(categories, cate._id.toString()),
        createdAt: cate.createdAt,
        updatedAt: cate.updatedAt,
      });
    });

    return allCategories;
  }
}
export default Lib;
