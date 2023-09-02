/* Rename this file db-config.js and fill it with your proper database credentials */
const mysql = require('mysql');

const YFM_DB = "yugioh_db";
const CARD_DROP_TABLE = "card_drop"
const CARD_LOOKUP_TABLE = "card_lookup";
const DUELIST_LOOKUP_TABLE = "duelist_lookup";
const GRADE_LOOKUP_TABLE = "grade_lookup"

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'db_user',
    password: 'db_pass',
    database: YFM_DB,
});

const db_tables = {
    card_drop: CARD_DROP_TABLE,
    card_lookup: CARD_LOOKUP_TABLE,
    duelist_lookup: DUELIST_LOOKUP_TABLE,
    grade_lookup: GRADE_LOOKUP_TABLE,
};

module.exports = { connection, db_tables };
