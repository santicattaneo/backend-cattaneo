import mongoose from 'mongoose';

const coursesCollection = 'courses';

const coursesSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    teacher: {
        type: String,
        require: true
    }
});

export const coursesModel = mongoose.model(coursesCollection, coursesSchema);