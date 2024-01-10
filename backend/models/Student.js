const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    roll: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    contact: {
        type: Number,
        length: 10,
        required: true,
    },
    dept: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }


})

const Student = mongoose.model('students', StudentSchema);
Student.createIndexes();
module.exports = Student;