import mongoose from 'mongoose';

export default function mongooseConfig(config) {
  mongoose.connect(config.db);

  const db = mongoose.connection;

  db.on('error', (err) => {
    console.error('connection error...', err);
  });
  db.once('open', () => {
    console.log('DB connection opened.');
  });
}
