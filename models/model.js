import { pool } from './pool.js';

class Model {
  constructor(table) {
    this.pool = pool;
    this.table = table;
    this.pool.on('error', (err, client) => `Error, ${err}, on idle client${client}`);
  }

  async select(columns, clause) {
    let query = `SELECT ${columns} FROM ${this.table} `;
    if (clause) query += clause;
    return this.pool.query(query);
  }

  async delete(condition) {
    let query = `DELETE FROM ${this.table} ${condition}`;
    return this.pool.query(query);
  }
}

export default Model;
