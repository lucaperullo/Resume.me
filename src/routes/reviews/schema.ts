import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    title: {
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
    profilePic: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      // match a valid email address
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "Please use a valid email address",
      ],
    },
  },
});

export default model("Review", reviewSchema);
