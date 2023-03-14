import { Schema, model } from "mongoose";
const categorySchema = new Schema(
  {
    name: { type: String, required: [true, "Provide category name"] },
    slug: { type: String, required: true },
    parentId: { type: String },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
const CategoryModel = model("category", categorySchema);
export default CategoryModel;
