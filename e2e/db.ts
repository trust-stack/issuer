import Database from 'better-sqlite3';

const resetData = (sqlite: Database.Database) => {
  sqlite.exec('DELETE FROM crypto_keys;');
  sqlite.exec('DELETE FROM private_keys;');
  sqlite.exec('DELETE FROM services;');
  sqlite.exec('DELETE FROM credentials;');
  sqlite.exec('DELETE FROM messages;');
  sqlite.exec('DELETE FROM identifiers;');
};

export { resetData };
