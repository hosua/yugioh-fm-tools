/* Rename this file db-config.js and fill it with your proper database credentials */
const mysql = require('mysql');

const YFM_DB = "yugioh_db";
const CARD_DROP_TABLE = "card_drop"
const CARD_LIST_TABLE = "card_list";
const DUELIST_TABLE = "duelist";

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'db_user',
    password: 'db_pass',
    database: YFM_DB,
});

const db_tables = {
    card_drop: CARD_DROP_TABLE,
    card_lookup: CARD_LIST_TABLE,
    duelist: DUELIST_TABLE
};

module.exports = { connection, db_tables };
