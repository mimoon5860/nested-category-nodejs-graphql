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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
const lib_1 = __importDefault(require("../utils/lib"));
const slug_1 = __importDefault(require("slug"));
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
    // get a single category service
    singleCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let category = yield categoryModel_1.default.findById(id);
            if (!category) {
                return {
                    success: false,
                    message: "No category found with this id",
                };
            }
            const categories = [category];
            while (category) {
                category = yield categoryModel_1.default.findById(category.parentId);
                if (category) {
                    categories.push(category);
                }
                else {
                    category = null;
                }
            }
            const allCates = yield lib_1.default.filterCategory(categories);
            return {
                success: true,
                data: allCates,
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
    updateCategory(categoryUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = categoryUpdate, rest = __rest(categoryUpdate, ["id"]);
            if (rest.name) {
                rest.slug = (0, slug_1.default)(rest.name);
            }
            const res = yield categoryModel_1.default.updateOne({ _id: id }, Object.assign({}, rest));
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
        });
    }
    // deactive a category service
    deactiveCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield categoryModel_1.default.findById(id);
            if (!category) {
                return {
                    success: false,
                    message: "No Category found with this id",
                };
            }
            category.active = false;
            category.save();
            const childCategories = yield categoryModel_1.default.find({
                parentId: category._id.toString(),
            });
            childCategories.forEach((category) => __awaiter(this, void 0, void 0, function* () {
                yield this.deactiveCategory(category._id.toString());
            }));
            return {
                success: true,
                message: "Category deactivated successfully",
            };
        });
    }
}
exports.default = CategoryService;
