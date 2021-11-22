import mongoose from 'mongoose';

async function connectDb() {
  const uri =
    process.env.MONGO_URI ||
    'mongodb+srv://Aviram2001:zn300j@cluster0.puixu.mongodb.net/Hlife?retryWrites=true&w=majority';
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

export default connectDb;
