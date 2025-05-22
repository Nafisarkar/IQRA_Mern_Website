const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  english: {
    type: String,
    required: true,
  },
  arabic: {
    type: String,
  },
  bangla: {
    type: String,
  },
  category: {
    type: String,
    required: true,
    enum: ["quran", "hadith", "fatwa", "bukhari", "muslim"], // restrict to 5 categories
  },
  tags: [String],
  author: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["published", "draft"],
    default: "draft",
  },
  slug: {
    type: String,
  },
  views: {
    type: Number,
    default: 0,
  },
});

const Post = model("Post", postSchema);
module.exports = Post;
