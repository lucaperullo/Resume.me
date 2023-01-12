import { Schema, model } from "mongoose";

const experienceSchema = new Schema({
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
    skills: [{
        type: Schema.Types.ObjectId,
        ref: "Skill",
        required: true,
    }],
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: "Company",
        required: true,
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: "Location",
        required: true,
    },
    type: {
       enum : ['Full Time', 'Part Time', 'Freelance', 'Internship', 'Apprenticeship'],
         type : String,
            required: true,
    },
    role:{
        enum: ['Frontend', 'Backend', 'Fullstack', 'DevOps', 'Data Science', 'UX/UI', 'Project Manager', 'Other'],
        type: String,
        required: true,
    },
    image: {
        type: String,
        match : [/^https?:\/\//, 'Please use a valid URL with HTTP or HTTPS'],
    },
    link: {
        type: String,
        match : [/^https?:\/\//, 'Please use a valid URL with HTTP or HTTPS'],
    },
    featured: {
        type: Boolean,
       
    },
});
