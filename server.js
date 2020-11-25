// ===== Server
// import all modules
const express				= require('express');
const cors					= require('cors');
const dotenv				= require('dotenv');
const mongoose			= require('mongoose');

// init dotenv, database & port
dotenv.config({ path: '.env' });
const database			= process.env.DB_NAME;
const port					= process.env.PORT || 3000;

// setup database
mongoose.connect(`mongodb://127.0.0.1:27017/${database}`, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
	if(err) 
		console.log(err);
	else
		console.log('Database has been connected by mongoose');
});

// init app
const app						= express();

// setup urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup cors
const whiteList			= [
	'http://127.0.0.1:3000',
	'http://localhost:3000'
];

const corsOpt				= {
	origin: function(origin, callback) {
		if(whiteList.indexOf(origin) != -1 || !origin)
			callback(null, true);
		else
			callback(new Error('Blocked by cors'));
	}
};

app.use(cors(corsOpt));

app.use('/api', require('./app/routes/pages'));

app.listen(port, () => console.log(`Web Service running at http://127.0.0.1:${port}/api`));

