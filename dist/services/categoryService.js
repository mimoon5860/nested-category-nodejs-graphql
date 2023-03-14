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
const lib_1 = __importDefault(require("../utils/lib"));
const slug_1 = __importDefault(require("slug"));
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
class CategoryService {
    // get all category service
    getAllCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            const cates = yield categoryModel_1.default.find();
            const data = lib_1.default.filterCategory(cates);
            return {
                success: true,
                data,
                message: "category get successful",
            };
        });
    }
    // create a category service
    createCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log({ category });
            const res = new categoryModel_1.default(Object.assign(Object.assign({}, category), { slug: (0, slug_1.default)(category.name) }));
            const data = yield res.save();
            return {
                success: true,
                data,
                message: "Category created successfully",
            };
        });
    }
    // update a category service
    updateCategory(status) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log({ status });
            return {
                success: true,
                message: "Category updated",
            };
        });
    }
}
exports.default = CategoryService;
