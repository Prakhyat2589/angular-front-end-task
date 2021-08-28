export class Page<T> {

  constructor(public items: T[], public page: number, public size: number, public total: number) {
  }

}
