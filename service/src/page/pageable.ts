import { Sort } from './sort';

export class Pageable {

  constructor(public page: number, public size: number, public sort: Sort) {
  }

  static from(obj: any, def: Pageable) {
    const page = Number(obj.page) || def.page;
    const size = Number(obj.size) || def.size;
    const sort = Sort.from(obj.sort) || def.sort;
    return new Pageable(page, size, sort);
  }

}
