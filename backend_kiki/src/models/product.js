const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    publishingYear: {
      type: Number,
      required: true
    },
    publishingDate: {
      type: Date
    },
    language: {
      type: String,
      required: true
    },
    pages: {
      type: Number,
      required: true
    },
    publisher: {
      type: String,
      required: true
    },
    form: {
      type: String,
      enum: ['Bìa Mềm', 'Bìa Cứng'],
      required: true
    },
    author: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    discountPercent: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    productPictures: [{ img: { type: String } }],
    reviews: [
      {
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        like: { type: Number, required: true },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    isDisabled: false,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
