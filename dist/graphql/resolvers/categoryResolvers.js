"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const categoryService_1 = __importDefault(require("../../services/categoryService"));
const categoryService = new categoryService_1.default();
const categoryResolvers = {
    // Queries
    Query: {
        // Get all categories
        getAllCategory: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield categoryService.getAllCategory();
                if (result.success) {
                    return result.data;
                }
                else {
                    throw new apollo_server_express_1.UserInputError(result.message);
                }
            }
            catch (err) {
                throw new apollo_server_express_1.UserInputError(err.message);
            }
        }),
        // search a category
        searchCategory: (_parent, { searchCategoryInput }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield categoryService.searchCategory(searchCategoryInput.name);
                if (result.success) {
                    return result.data;
                }
                else {
                    throw new apollo_server_express_1.UserInputError(result.message);
                }
            }
            catch (err) {
                throw new apollo_server_express_1.UserInputError(err.message);
            }
        }),
    },
    // Mutations
    Mutation: {
        // Create a category
        createACategory: (_parent, { createCategoryInput }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield categoryService.createCategory(createCategoryInput);
                if (result.success) {
                    return result.data;
                }
                else {
                    throw new apollo_server_express_1.UserInputError(result.message);
                }
            }
            catch (err) {
                throw new apollo_server_express_1.UserInputError(err.message);
            }
        }),
        // update a category
        updateACategory: (_parent, { updateCategoryInput }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield categoryService.updateCategory(updateCategoryInput);
                if (result.success) {
                    return result;
                }
                else {
                    throw new apollo_server_express_1.UserInputError(result.message);
                }
            }
            catch (err) {
                throw new apollo_server_express_1.UserInputError(err.message);
            }
        }),
        // deactive a category
        deactiveCategory: (_parent, { deactiveCategoryInput, }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield categoryService.deactiveCategory(deactiveCategoryInput.categoryId);
                if (result.success) {
                    return result;
                }
                else {
                    throw new apollo_server_express_1.UserInputError(result.message);
                }
            }
            catch (err) {
                throw new apollo_server_express_1.UserInputError(err.message);
            }
        }),
    },
};
exports.default = categoryResolvers;
