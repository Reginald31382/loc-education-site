import { Schema, model, models } from "mongoose";

const SiteVisitSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: "site-visits",
    },

    count: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const SiteVisit = models.SiteVisit || model("SiteVisit", SiteVisitSchema);

export default SiteVisit;
