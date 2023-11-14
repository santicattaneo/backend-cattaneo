import mongoose from 'mongoose';

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
        //definir la referencia a la coleccion de cursos
        type:[{
            course: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'courses'
            }
        }],
        default: []
    }
})

//middleward
studentsSchema.pre('find', function() {
    this.populate('courses.course');
});

export const studentsModel = mongoose.model(studentsCollection, studentsSchema);