import { Schema, model } from "mongoose";

const locationSchema = new Schema(
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
    coordinates: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
    remote: {
      type: Boolean,
    },
    hybride: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Location", locationSchema);
