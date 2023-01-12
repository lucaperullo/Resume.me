import {Schema , model} from "mongoose";

const projectSchema = new Schema({
    name: {
      type : String,
        required: true,
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
    image: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
        match : [/^https?:\/\//, 'Please use a valid URL with HTTP or HTTPS'],
    },
    skills: {
    //    array of skills type object id
     
    type : [Schema.Types.ObjectId],
    ref : "Skill",
    
    },
    github: {
        type: String,
        required: true,
        match : [/^https?:\/\//, 'Please use a valid URL with HTTP or HTTPS'],
    },
    date: {
        type: Date,
        required: true,
    },
    featured: {
        type: Boolean,
        required: true,
    },
    type: {
        enum: ["frontend", "backend", "fullstack"],
        type: String,
        required: true,
    },
    status: {
        enum: ["completed", "ongoing"],
        type: String,
        required: true,
    },
    languages: {
        type: Array,
        required: true,
    },
    frameworks: {
        type: Array,
        required: true,
    },
    libraries: {
        type: Array,
        required: true,
    },
    databases: {
        type: Array,
        required: true,
    },
    tools: {
        type: Array,
        required: true,
    },
    other: {
        type: Array,
        
    },
    images: {
        type: Array,
        required: true,
    },
    videos: {
        type: Array,

    },

});


