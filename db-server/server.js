const express = require('express');
const { connection, db_tables } = require('./db-config.js');

const app = express();
app.use(express.json());

/*
+---------------------+
| Tables_in_yugioh_db |
+---------------------+
| card_drop           |
| card_lookup         |
| duelist_lookup      |
| grade_lookup        |
+---------------------+
*/

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Server!');
});

// get messages from server
app.post("/yugioh-fm-tools/api/fetch-db", (req, res) => {
    console.log("Fetching messages from database...");
    var query = `SELECT * FROM {db_tables.card_info}`;

    connection.query(query, (err, results, fields) => {
        if (err) {
            console.log(err);
            connection.end();
            return res.status(500).json({ error: "Error fetching data" });
        }

        const data = JSON.parse(JSON.stringify(results)); // Parse the entire results array
        res.json(data);
    });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

