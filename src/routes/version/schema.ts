import { Schema, model } from "mongoose";

const versionSchema = new Schema({
    version: {
        type: String,
        required: true,
    }});

export default model("Version", versionSchema);
