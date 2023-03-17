import CategoryModel from "../models/categoryModel";
import Lib from "../utils/lib";
import {
  ICategory,
  ICategoryInput,
  IUpdateCategoryInput,
} from "../utils/types";
import slug from "slug";

class CategoryService {
  // get all category service
  public async getAllCategory() {
    const cates: ICategory[] = await CategoryModel.find();
    const data = Lib.filterCategory(cates);
    return {
      success: true,
      data,
      message: "category get successful",
    };
  }

  // get a single category service
  public async singleCategory(id: string) {
    let category: ICategory | null = await CategoryModel.findById(id);

    if (!category) {
      return {
        success: false,
        message: "No category found with this id",
      };
    }

    const categories: ICategory[] = [category];

    while (category) {
      category = await CategoryModel.findById(category.parentId);
      if (category) {
        categories.push(category);
      } else {
        category = null;
      }
    }

    const allCates = await Lib.filterCategory(categories);

    return {
      success: true,
      data: allCates,
    };
  }

  // create a category service
  public async createCategory(category: ICategoryInput) {
    console.log({ category });
    const res = new CategoryModel({
      ...category,
      slug: slug(category.name),
    });
    const data = await res.save();

    return {
      success: true,
      data,
      message: "Category created successfully",
    };
  }

  // update a category service
  public async updateCategory(categoryUpdate: IUpdateCategoryInput) {
    const { id, ...rest } = categoryUpdate;

    if (rest.name) {
      rest.slug = slug(rest.name);
    }

    const res = await CategoryModel.updateOne({ _id: id }, { ...rest });
    if (!res.modifiedCount) {
      return {
        success: false,
        message: "No category found with this id",
      };
    }

    return {
      success: true,
      message: "Category updated",
    };
  }

  // deactive a category service
  public async deactiveCategory(id: String) {
    const category = await CategoryModel.findById(id);
    if (!category) {
      return {
        success: false,
        message: "No Category found with this id",
      };
    }
    category.active = false;
    category.save();

    const childCategories = await CategoryModel.find({
      parentId: category._id.toString(),
    });

    childCategories.forEach(async (category: any) => {
      await this.deactiveCategory(category._id.toString());
    });

    return {
      success: true,
      message: "Category deactivated successfully",
    };
  }
}
export default CategoryService;
