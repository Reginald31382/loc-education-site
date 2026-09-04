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
      default: "",
    },

    userName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
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

    adminReply: {
      type: String,
      default: "",
      trim: true,
      maxlength: 2000,
    },

    adminReplyAt: {
      type: Date,
      default: null,
    },

    // Users who have liked this comment.
    // Storing user IDs prevents duplicate likes.
    likedBy: {
      type: [String],
      default: [],
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
