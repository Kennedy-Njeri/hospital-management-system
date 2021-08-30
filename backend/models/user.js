const mongoose = require('mongoose')
const bcrypt =  require('bcryptjs')



// trim- to remove any spaces at the beginning and end

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true,
        },
        about: {
            type: String,
            trim: true
        },
        role: {
            type: Number,
            required: true,
        },
        details: {
            type: Object,
            default: { }
        }
    },
    { timestamps: true }
);


userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

module.exports = mongoose.model('User', userSchema);