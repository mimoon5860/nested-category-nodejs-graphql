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

  public async findParentCategory(category: any) {
    if (!category.parentId) {
    }
  }

  // search a category service
  public async searchCategory(name: string) {
    const category = await CategoryModel.findOne({ name });

    return {
      success: true,
      message: "",
      data: "",
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
