import { Schema,model } from "mongoose";

const skillSchema = new Schema({
    name: {
      it:{
        type: String,
        required: true,
        },
        en:{
            type: String,
            required: true,
        },
        es:{
            type: String,
            required: true,
        },
        fr:{
            type: String,
            required: true,
        },
        de:{
            type: String,
            required: true,
        },
        pt:{
            type: String,
            required: true,
        },
        ru:{
            type: String,
            required: true,
        }
      },
    description: {
        it:{
            type: String,
            required: true,
            },
            en:{
                type: String,
                required: true,
            },
            es:{
                type: String,
                required: true,
            },
            fr:{
                type: String,
                required: true,
            },
            de:{
                type: String,
                required: true,
            },
            pt:{
                type: String,
                required: true,
            },
            ru:{
                type: String,
                required: true,
            }
    },
    level: {
        type: Number,
        required: true,
        maxLength: 5,
        match : [/^[0-5]$/, 'Level must be between 0 and 5']
    },
    category: {
 
        type: String,
        required: true,
        enum:['Frontend', 'Backend', 'DevOps', 'Other'],

    },
    icon: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
        match : [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Color must be a valid hex color']
    },
    link: {
        type: String,
        required: true,
        match : [/^https?:\/\/[^\s$.?#].[^\s]*$/, 'Link must be a valid URL']
    },
        

}); 

export default model("Skill", skillSchema);
