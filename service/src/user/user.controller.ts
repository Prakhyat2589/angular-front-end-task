import { NextFunction, Request, Response } from 'express';
import { Pageable } from '../page/pageable';
import { Direction, Sort } from '../page/sort';
import { User } from './user';
import * as userRepository from './user.repository';
import { UserNotFoundException } from './user.repository';

export function getPage(req: Request, res: Response, next: NextFunction) {
  const pageable = Pageable.from(req.query, new Pageable(0, 20, new Sort('id', Direction.ASC)));
  userRepository.getPage(pageable)
    .then((page) => res.json(page))
    .catch((e) => handleErrors(e, res, next));
}

export function get(req: Request, res: Response, next: NextFunction) {
  const userId = Number(req.params.userId);
  userRepository.getExistingById(userId)
    .then((user) => res.json(user))
    .catch((e) => handleErrors(e, res, next));
}

export function create(req: Request, res: Response, next: NextFunction) {
  const user = req.body as User;
  userRepository.save(user)
    .then((updated) => {
      res.status(201);
      res.json(updated);
    })
    .catch((e) => handleErrors(e, res, next));
}

export function update(req: Request, res: Response, next: NextFunction) {
  const user = req.body as User;
  userRepository.save(user)
    .then((updated) => res.json(updated))
    .catch((e) => handleErrors(e, res, next));
}


export function deleteOne(req: Request, res: Response, next: NextFunction) {
  const userId = Number(req.params.userId);
  userRepository.deleteById(userId)
    .then((deleted) => res.status(204))
    .catch((e) => handleErrors(e, res, next));
}

function handleErrors(e: Error, res: Response, next: NextFunction) {
  if (e instanceof UserNotFoundException) {
    res.status(404);
    res.json({ error: e.name, status: 404, cause: e.message });
  } else {
    next(e);
  }
}
