import { Schema , model} from 'mongoose';

const certificationSchema = new Schema({
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
    image: {
        type: String,
       
    },
    imageSmall: {
        type: String,
       
    },
    link: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
});

export default model('Certification', certificationSchema);
