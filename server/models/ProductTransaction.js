import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  sold: Boolean,
  dateOfSale: Date,
});

productSchema.index({ title: 'text', description: 'text', price: 1 });

const ProductTransaction = mongoose.model('product_transactions', productSchema);

export default ProductTransaction;
