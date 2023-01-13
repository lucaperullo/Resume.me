import { Schema, model } from "mongoose";

const metadataSchema = new Schema({
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
  //   keywords: {
  //     it: {
  //       type: String,
  //       required: true,
  //     },
  //     en: {
  //       type: String,
  //       required: true,
  //     },
  //     es: {
  //       type: String,
  //       required: true,
  //     },
  //     fr: {
  //       type: String,
  //       required: true,
  //     },
  //     de: {
  //       type: String,
  //       required: true,
  //     },
  //     pt: {
  //       type: String,
  //       required: true,
  //     },
  //     ru: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  image: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    match: [/^https?:\/\//, "Please use a valid URL with HTTP or HTTPS"],
  },
  type: {
    type: String,
    required: true,
  },
  locale: {
    type: String,
    required: true,
  },
  site_name: {
    type: String,
    required: true,
  },
});

export default model("Metadata", metadataSchema);
