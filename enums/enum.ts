export class Enums {
  private keys: Array<string>;
  private values: Array<string>;

  constructor(obj: object) {
    this.keys = [...Object.keys(obj)];
    this.values = [...Object.values(obj)];
  }

  get = (code: string) => {
    if (this.keys.includes(code)) {
      return this.values[this.keys.indexOf(code)];
    } else if (this.values.includes(code)) {
      return this.keys[this.values.indexOf(code)];
    } else {
      return "";
    }
  };
}
