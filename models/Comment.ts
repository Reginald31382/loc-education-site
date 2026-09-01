import mongoose, { Schema, model, models } from "mongoose";

const CommentSchema = new Schema(
  {
    articleSlug: {
      type: String,
      required: true,
      index: true,
    },

    contentType: {
      type: String,
      enum: ["lesson", "product"],
      default: "lesson",
      required: true,
    },

    userId: {
      type: String,
      required: true,
    },

    userName: {
      type: String,
      required: true,
    },

    userImage: {
      type: String,
      default: "",
    },

    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

const Comment = models.Comment || model("Comment", CommentSchema);

export default Comment;
