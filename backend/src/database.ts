import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/user', {
  family: 4
})
  .then(db => console.log('Database is connected.'))
  .catch(err => console.error(err));