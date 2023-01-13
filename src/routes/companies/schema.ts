import { Schema, model } from "mongoose";

const companySchema = new Schema(
  {
    name: {
      it: {
        type: String,
        required: true,
      },
      en: {
        type: String,
        required: true,
      },
      es: {
        type: String,
        required: true,
      },
      fr: {
        type: String,
        required: true,
      },
      de: {
        type: String,
        required: true,
      },
      pt: {
        type: String,
        required: true,
      },
      ru: {
        type: String,
        required: true,
      },
    },
    description: {
      it: {
        type: String,
        required: true,
      },
      en: {
        type: String,
        required: true,
      },
      es: {
        type: String,
        required: true,
      },
      fr: {
        type: String,
        required: true,
      },
      de: {
        type: String,
        required: true,
      },
      pt: {
        type: String,
        required: true,
      },
      ru: {
        type: String,
        required: true,
      },
    },
    logo: {
      type: String,
      required: true,
      match: [/^https?:\/\//, "Please use a valid URL with HTTP or HTTPS"],
    },
    url: {
      type: String,
      required: true,
      match: [/^https?:\/\//, "Please use a valid URL with HTTP or HTTPS"],
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Company", companySchema);
