import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/store-db', {
  family: 4
})
  .then(db => console.log('Database is connected.'))
  .catch(err => console.error(err));