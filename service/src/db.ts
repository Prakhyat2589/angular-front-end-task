import fs from 'fs';
import { RunResult, verbose } from 'sqlite3';

const sqlite3 = verbose();
const db = new sqlite3.Database(':memory:');

export async function init() {
  return readFixture(__dirname + '/data/fixture.sql').then((sql) => runScript(sql));
}

function readFixture(file: string): Promise<string> {
  return new Promise((resolve) => {
    fs.readFile(file, (e, data: Buffer) => {
      if (e) {
        throw e;
      }
      resolve(data.toString());
    });
  });
}

function runScript(sql: string): Promise<void> {
  return new Promise((resolve) => {
    db.exec(sql, (e) => {
      if (e) {
        throw e;
      }
      resolve();
    });
  });
}

export function exec(sql: string, params: any): Promise<RunResult> {
  return new Promise((resolve) => {
    db.run(sql, params, function(e) {
      if (e) {
        throw e;
      }
      resolve(this);
    });
  });
}

export function query<T>(sql: string, params?: any): Promise<T[]> {
  return new Promise((resolve) => {
    db.all(sql, params, (e, rows: T[]) => {
      if (e) {
        throw e;
      }
      resolve(rows);
    });
  });
}

export function close() {
  db.close();
}
