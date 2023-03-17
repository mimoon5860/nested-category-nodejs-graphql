import { UserInputError } from "apollo-server-express";
import CategoryService from "../../services/categoryService";
import { ICategoryInput, IUpdateCategoryInput } from "../../utils/types";
const categoryService = new CategoryService();
const categoryResolvers = {
  // Queries
  Query: {
    // Get all categories
    getAllCategory: async () => {
      try {
        const result = await categoryService.getAllCategory();
        if (result.success) {
          return result.data;
        } else {
          throw new UserInputError(result.message);
        }
      } catch (err: any) {
        throw new UserInputError(err.message);
      }
    },

    // get a single category
    getSingleCategory: async (
      _parent: any,
      { singleCategory }: { singleCategory: { id: string } }
    ) => {
      try {
        const result = await categoryService.singleCategory(singleCategory.id);
        if (result.success) {
          return result.data;
        } else {
          throw new UserInputError(result.message || "");
        }
      } catch (err: any) {
        throw new UserInputError(err.message);
      }
    },
  },

  // Mutations
  Mutation: {
    // Create a category
    createACategory: async (
      _parent: any,
      { createCategoryInput }: { createCategoryInput: ICategoryInput }
    ) => {
      try {
        const result = await categoryService.createCategory(
          createCategoryInput
        );
        if (result.success) {
          return result.data;
        } else {
          throw new UserInputError(result.message);
        }
      } catch (err: any) {
        throw new UserInputError(err.message);
      }
    },

    // update a category
    updateACategory: async (
      _parent: any,
      { updateCategoryInput }: { updateCategoryInput: IUpdateCategoryInput }
    ) => {
      try {
        const result = await categoryService.updateCategory(
          updateCategoryInput
        );
        if (result.success) {
          return result;
        } else {
          throw new UserInputError(result.message);
        }
      } catch (err: any) {
        throw new UserInputError(err.message);
      }
    },

    // deactive a category
    deactiveCategory: async (
      _parent: any,
      {
        deactiveCategoryInput,
      }: { deactiveCategoryInput: { categoryId: string } }
    ) => {
      try {
        const result = await categoryService.deactiveCategory(
          deactiveCategoryInput.categoryId
        );
        if (result.success) {
          return result;
        } else {
          throw new UserInputError(result.message);
        }
      } catch (err: any) {
        throw new UserInputError(err.message);
      }
    },
  },
};
export default categoryResolvers;
