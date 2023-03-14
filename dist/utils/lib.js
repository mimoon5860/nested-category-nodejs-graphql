"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Lib {
    static filterCategory(categories, parentId) {
        const allCategories = [];
        let category;
        if (!parentId) {
            category = categories.filter((cate) => cate.parentId === undefined);
        }
        else {
            category = categories.filter((cate) => cate.parentId === parentId);
        }
        category.forEach((cate) => {
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
exports.default = Lib;
