export class newCategory {
  name: string;
  color: string;
  delete: boolean;

  constructor(obj?: any) {
    // das Fragezeichen als optionales Argument und kann daher auch ohne obj verwendet werden
    this.name = obj ? obj.name : ''; // obj = wenn es exestiert dann wird obj.firstName übergeben, wenn nicht dann '' (leerer string)
    this.color = obj ? obj.color : '';
    this.delete = obj ? obj.delete : true;
  }

  public toJSON() {
    return {
      name: this.name,
      color: this.color,
      delete: this.delete,
    };
  }
}
