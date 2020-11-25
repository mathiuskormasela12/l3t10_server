// ===== appController
// import models
const productModel		= require('../models/Product');

exports.home					= function(req, res) {
	return res.status(200).json({
		error: 'False',
		type: 'success',
		message: 'Welcome to L3T10 Web Service'
	});
}

exports.addProduct		= async function(req, res) {
	const {
		namaProduk,
		keterangan,
		harga,
		jumlah
	} = req.body;

	if(!namaProduk || !keterangan || !harga || !jumlah) {
		return res.status(200).json({
			error: 'False',
			type: 'warning',
			message: 'Form Kosong'
		});
	}

	if(namaProduk.length < 2 || namaProduk.length > 50) {
		return res.status(200).json({
			error: 'False',
			type: 'warning',
			message: 'Nama Produk min 2 karakter & max 50 karakter'
		});
	}

	if(keterangan.length < 2 || keterangan.length > 100) {
		return res.status(200).json({
			error: 'False',
			type: 'warning',
			message: 'Keterangan Produk min 2 karakter & max 100 karakter'
		});
	}

	if(harga < 100) {
		return res.status(200).json({
			error: 'False',
			type: 'warning',
			message: 'Harga Produk minimal Rp. 100'
		});
	}

	if(jumlah < 1) {
		return res.status(200).json({
			error: 'False',
			type: 'warning',
			message: 'Jumlah Produk minimal 1 produk'
		});
	}

	try {
		const results = await productModel.find({ nama_produk: namaProduk.toLowerCase() });
		if(results.length > 0) {
			return res.status(200).json({
				error: 'False',
				type: 'warning',
				message: 'Produk telah tersedia'
			});
		} else {
			const data = new productModel({
				nama_produk: namaProduk.toLowerCase(),
				keterangan: keterangan.toLowerCase(),
				harga,
				jumlah
			});

			try {
				const results = await data.save();
				return res.status(200).json({
					error: 'False',
					type: 'success',
					message: 'Produk telah berhasil ditambahkan'
				});
			} catch(err) {
				console.log(err);
				return res.status(500).json({
					error: 'True',
					type: 'danger',
					message: 'Server Error'
				});
			}
		}
	} catch(err) {
		console.log(err);
		return res.status(500).json({
			error: 'True',
			type: 'danger',
			message: 'Server Error'
		});
	}
}

exports.getProducts							= async function(req, res) {
	try {
		const results = await productModel.find();
		if(results.length > 0) {
			return res.status(200).json({
				error: 'False',
				type: 'success',
				totalResults: results.length,
				message: `Berhasil mengambil ${results.length} buah produk`,
				results
			});
		} else {
			return res.status(200).json({
				error: 'False',
				type: 'warning',
				totalResults: results.length,
				message: 'Tidak ada data',
				results: []
			});
		} 
	} catch(err) {
		console.log(err);
		return res.status(500).json({
			error: 'True',
			type: 'danger',
			message: 'Server Error'
		});
	}	
}

exports.getProductById					= async function(req, res) {
	const id = req.params.id;

	if(!id) {
		return res.status(200).json({
			error: 'False',
			type: 'warning',
			message: 'Id produk bermasalah'
		});
	}

	try {
		const results = await productModel.findOne({ _id: id });
		if(results != null || results != undefined) {
			return res.status(200).json({
				error: 'False',
				type: 'success',
				totalResults: results.length,
				message: `Berhasil mengambil sebuah produk`,
				results
			});
		} else {
			return res.status(200).json({
				error: 'False',
				type: 'warning',
				totalResults: results.length,
				message: 'Tidak ada produk',
			});
		} 
	} catch(err) {
		console.log(err);
		return res.status(500).json({
			error: 'True',
			type: 'danger',
			message: 'Server Error'
		});
	}	
}

exports.removeProduct					= async function(req, res) {
	const id = req.params.id;

	if(!id) {
		return res.status(200).json({
			error: 'False',
			type: 'warning',
			message: 'Id produk bermasalah'
		});
	}

	try {
		const results = await productModel.find({ _id: id });
		if(results.length > 0) {
			try {
				const results = await productModel.deleteOne({ _id: id });
				return res.status(200).json({
					error: 'False',
					type: 'success',
					message: 'Berhasil menghapus sebuah produk'
				});
			} catch(err) {
				console.log(err);
				return res.status(500).json({
					error: 'True',
					type: 'danger',
					message: 'Server Error'
				});
			}
		} else {
			return res.status(200).json({
				error: 'False',
				type: 'waning',
				message: 'gagal menghapus sebuah produk, id tidak dikenali'
			});
		}
	} catch(err) {
		console.log(err);
		return res.status(500).json({
			error: 'True',
			type: 'danger',
			message: 'Server Error'
		});
	}
}

exports.editProduct		= async function(req, res) {
	const {
		id,
		namaProduk,
		keterangan,
		harga,
		jumlah
	} = req.body;

	if(!id || !namaProduk || !keterangan || !harga || !jumlah) {
		return res.status(200).json({
			error: 'False',
			type: 'warning',
			message: 'Form Kosong'
		});
	}

	if(namaProduk.length < 2 || namaProduk.length > 50) {
		return res.status(200).json({
			error: 'False',
			type: 'warning',
			message: 'Nama Produk min 2 karakter & max 50 karakter'
		});
	}

	if(keterangan.length < 2 || keterangan.length > 100) {
		return res.status(200).json({
			error: 'False',
			type: 'warning',
			message: 'Keterangan Produk min 2 karakter & max 100 karakter'
		});
	}

	if(harga < 100) {
		return res.status(200).json({
			error: 'False',
			type: 'warning',
			message: 'Harga Produk minimal Rp. 100'
		});
	}

	if(jumlah < 1) {
		return res.status(200).json({
			error: 'False',
			type: 'warning',
			message: 'Jumlah Produk minimal 1 produk'
		});
	}

	try {
		const results = await productModel.updateOne({ 
			_id: id 
		}, 
		{ 
			nama_produk: namaProduk.toLowerCase(),
			keterangan: keterangan.toLowerCase(),
			harga,
			jumlah
		});
		return res.status(200).json({
			error: 'False',
			type: 'success',
			message: 'Produk telah berhasil diubah'
		});
	} catch(err) {
		console.log(err);
		return res.status(500).json({
			error: 'True',
			type: 'danger',
			message: 'Server Error'
		});
	}
}

