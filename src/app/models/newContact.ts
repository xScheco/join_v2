export class newContact {
  firstname: string;
  lastname: string;
  email: string;
  color: string;
  phone: number;

  constructor(obj?: any) {
    // das Fragezeichen als optionales Argument und kann daher auch ohne obj verwendet werden
    this.firstname = obj ? obj.firstname : ''; // obj = wenn es exestiert dann wird obj.firstName übergeben, wenn nicht dann '' (leerer string)
    this.lastname = obj ? obj.lastname : '';
    this.email = obj ? obj.email : '';
    this.color = obj ? obj.color : '';
    this.phone = obj ? obj.phone : '';
  }

  public toJSON() {
    return {
      firstname: this.firstname,
      lastname: this.lastname,
      color: this.color,
      email: this.email,
      phone: this.phone,
    };
  }
}
