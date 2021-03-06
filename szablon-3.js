// WYŚWIETLA + ZMIENIA PASSWORD DANEGO USERA

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/nodeappdatabase', {
    useMongoClient: true
});

//new user Schema
const userSchema = new Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: Boolean,
    created_at: Date,
    updated_at: Date
});

//Mongoose schema method
userSchema.methods.manify = function(next) {
    this.name = this.name + '-boy';

    return next(null, this.name);
};

//pre-save method
userSchema.pre('save', function(next) {
    //pobranie aktualnego czasu
    const currentDate = new Date();

    //zmiana pola na aktualny czas
    this.updated_at = currentDate;

    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

const User = mongoose.model('User', userSchema);

// ----------------------------------

User.find({ username: 'Kenny_the_boy' }, function(err, user) {
    if (err) throw err;
    console.log('Old password is ' + user[0].password);
    user[0].password = 'newPassword';
    console.log('New password is ' + user[0].password);


    user[0].save(function(err) {
        if (err) throw err;

        console.log('Uzytkownik ' + user[0].name + ' zostal pomyslnie zaktualizowany');
    })
});