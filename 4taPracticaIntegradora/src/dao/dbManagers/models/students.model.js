import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const studentsCollection = 'students';

const studentsSchema = new mongoose.Schema({
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    dni: Number,
    birth_date: Date,
    gender: {
        type: String,
        enum: ['M', 'F'] 
    },
    courses: {
        type: [
            {
                course:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'courses'
                }
            }
        ],
        default: []
    }
})

studentsSchema.plugin(mongoosePaginate);

studentsSchema.pre('find', function() {
    this.populate('courses.course');
});

export const studentsModel = mongoose.model(studentsCollection, studentsSchema);