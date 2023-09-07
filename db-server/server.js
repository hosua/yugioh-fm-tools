const express = require('express');
const { connection, db_tables } = require('./db-config.js');
const timeout = require('connect-timeout');

const TIMEOUT = '60s';

const app = express();
app.use(express.json());
app.use(timeout(TIMEOUT));

connection.connect((err) => {
	if (err) throw err;
	console.log('Connected to MySQL Server!');
});

// get messages from server
app.post("/yugioh-fm-tools/api/fetch-card-list", (req, res) => {
	if (!req.timedout){
		console.log("Fetching card list...");
		var query = `SELECT * FROM ${db_tables.card_list}`;
		connection.query(query, (err, results, fields) => {
			if (err) {
				console.log(err);
				connection.end();
				return res.status(500).json({ error: "Error fetching data" });
			}

			const data = JSON.parse(JSON.stringify(results)); // Parse the entire results array
			res.json(data);
		});
	} else {
		console.log("fetch-card-list timed out!");
	}
});

app.post("/yugioh-fm-tools/api/fetch-duelists", (req, res) => {
	if (!req.timedout){
		console.log("Fetching duelists...");
		var query = `SELECT Name FROM ${db_tables.duelist}`;
		connection.query(query, (err, results, fields) => {
			if (err) {
				console.log(err);
				connection.end();
				return res.status(500).json({ error: "Error fetching data" });
			}

			const data = JSON.parse(JSON.stringify(results)); // Parse the entire results array
			res.json(data);
		});
	} else {
		console.log("fetch-dueslists timed out!");
	}
});

app.post("/yugioh-fm-tools/api/fetch-card-drops", (req, res) => {
	if (!req.timedout){
		console.log("Fetching card drops...");
		var query = `SELECT * FROM ${db_tables.card_drop} WHERE Duelist = ?`;
		const { queryFilter } = req.body;
		connection.query(query, [queryFilter], (err, results, fields) => {
			if (err) {
				connection.end();
				return res.status(500).json({ error: "Error fetching data" });
			}
			const data = JSON.parse(JSON.stringify(results)); // Parse the entire results array
			res.json(data);
		});
	} else {
		console.log("fetch-card-drops timed out!");
	}
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

