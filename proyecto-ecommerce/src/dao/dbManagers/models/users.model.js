import mongoose from 'mongoose';

const userCollection = 'user';

const userSchema = new mongoose.Schema({
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
    age: Number,
    password: {
        type: String,
        require: true
    },
    cart: {
        type: [{
            cart: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'carts'
            }
        }]
    },
    role: {
        type: String,
        default: 'USER'
    }
});

userSchema.pre('find', function(next) {
    this.populate('carts.cart');
    next();
});

userSchema.pre('findById', function(next) {
    this.populate('carts.cart');
    next();
});

const usersModel = mongoose.model(userCollection, userSchema);

export default usersModel;