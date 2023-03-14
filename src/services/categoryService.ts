import Lib from "../utils/lib";
import {
  ICategory,
  ICategoryInput,
  IUpdateCategoryInput,
} from "../utils/types";
import slug from "slug";
import CategoryModel from "../models/categoryModel";
import { Model } from "mongoose";

class CategoryService {
  // get all category service
  public async getAllCategory() {
    const cates: Model<ICategory>[] = await CategoryModel.find();
    const data = Lib.filterCategory(cates);
    return {
      success: true,
      data,
      message: "category get successful",
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
  public async updateCategory(status: IUpdateCategoryInput) {
    console.log({ status });
    return {
      success: true,
      message: "Category updated",
    };
  }
}
export default CategoryService;
