import { Pool } from 'postgres-pool';

const pool = new Pool({
	user: 'postgres',
	password: 'admin',
	host: 'localhost',
	port: 5432,
	database: 'test_base2'
});

export default pool;
