// database.d.ts
interface KnexConnection extends Knex<any, unknown[]> {
  test?: () => Promise<any>;
}

import { knex, Knex } from "knex";
import getLogger from "../utils/logger";
const logger = getLogger("Knex");

const config: Knex.Config = {
  client: "mysql",
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    user: process.env.DB_AUTH_USER,
    password: process.env.DB_AUTH_PASSWORD,
    database: process.env.DB_NAME || "typeamazing",
  },
  log: {
    warn(message) {
      logger.warn(message);
    },
    error(message) {
      logger.error(message);
    },
    deprecate(message) {
      logger.alert(message);
    },
    debug(message) {
      logger.debug(message);
    },
  },
};

export const db: KnexConnection = knex(config);
db.test = async () => {
  return db.raw("select 1+1 as result").then(()=>{
    logger.info('Connected to Database...')
  })
};

export default config;
