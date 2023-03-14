"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    name: { type: String, required: [true, "Provide category name"] },
    slug: { type: String, required: true },
    parentId: { type: String },
    active: { type: Boolean, default: true },
}, {
    timestamps: true,
});
const CategoryModel = (0, mongoose_1.model)("category", categorySchema);
exports.default = CategoryModel;
