"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Pool } = require('pg');
const pool = new Pool({
    host: "localhost",
    user: 'postgres',
    port: 5432,
    password: "123",
    database: "Outfit_data"
});
exports.default = pool;
