// ===== Product
// import mongoose
const mongoose						= require('mongoose');
const { Schema, model }	 	= mongoose;

const productSchema = new Schema({
	nama_produk: {
		type: String,
		minlength: 2,
		maxlength: 50,
		required: true
	},
	keterangan: {
		type: String,
		minlength: 2,
		maxlength: 100,
		required: true
	},
	harga: {
		type: Number,
		min: 100,
		required: true
	},
	jumlah: {
		type: Number,
		min: 1,
		required: true
	}
});

module.exports						= model('product', productSchema);
