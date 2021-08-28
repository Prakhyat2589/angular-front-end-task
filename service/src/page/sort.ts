export class Sort {

  constructor(public field: string, public direction: Direction) {
  }

  static from(s?: any): Sort | null {
    if (s && typeof s === 'string') {
      const c = s.split(',');
      if (c.length === 2 && c[1].match(/(asc|desc)/i)) {
        const direction = c[1].toLowerCase() === 'asc' ? Direction.ASC : Direction.DESC;
        return new Sort(c[0], direction);
      }
    }
    return null;
  }

}

export enum Direction {
  ASC, DESC
}
