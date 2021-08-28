import * as db from '../db';
import { Page } from '../page/page';
import { Pageable } from '../page/pageable';
import { Direction } from '../page/sort';
import { User } from './user';

export async function getPage(pageable: Pageable): Promise<Page<User>> {
  const offset = pageable.page * pageable.size;
  const sortDir = pageable.sort.direction === Direction.ASC ? 'ASC' : 'DESC';
  const orderBy = pageable.sort.field + ' ' + sortDir;
  const sql = 'SELECT id, birth_date birthDate, first_name firstName, last_name lastName, gender, created ' +
    'FROM `user` ORDER BY ' + orderBy + ' LIMIT ? OFFSET ?';
  return db.query<User>(sql, [pageable.size, offset])
    .then(async (users) => {
      const total = await countAll();
      return new Page<User>(users, pageable.page, pageable.size, total);
    });
}

function countAll(): Promise<number> {
  const sql = 'SELECT COUNT(*) c FROM `user`';
  return db.query<any>(sql).then((r) => r.length === 1 ? r[0].c : null);
}

export function getById(userId: number): Promise<User | null> {
  const sql = 'SELECT id, birth_date birthDate, first_name firstName, last_name lastName, gender, created ' +
    'FROM `user` WHERE id = ?';
  return db.query(sql, [userId])
    .then((users: User[]) => users.length === 0 ? null : users[0]);
}

export async function getExistingById(userId: number): Promise<User> {
  const user = await getById(userId);
  if (user === null) {
    throw new UserNotFoundException(`User id=${userId} was not found`);
  } else {
    return user;
  }
}

export async function deleteById(userId: number): Promise<User> {
  const user = await getExistingById(userId);
  const sql = 'DELETE FROM `user` WHERE `user`.id == ?';
  return db.exec(sql, [userId])
    .then(() => user);
}

export async function save(user: User): Promise<User> {
  const existing = user.id ? await getById(user.id) : null;
  if (existing === null) {
    return create(user);
  } else {
    return update(user);
  }
}

function create(user: User): Promise<User> {
  const sql = 'INSERT INTO `user` (id, birth_date, first_name, last_name, gender, created) VALUES (?, ?, ?, ?, ?, ?)';
  return db.exec(sql, Object.values(user))
    .then((r) => getExistingById(r.lastID));
}

function update(user: User): Promise<User> {
  const sql = 'UPDATE `user` SET id = ?, birth_date = ?, first_name = ?, last_name = ?, gender = ?, created = ? ' +
    'WHERE id = ?';
  return db.exec(sql, Object.values(user).concat(user.id))
    .then(() => user);
}

export class UserNotFoundException extends Error {
  name = 'UserNotFoundException';
}
