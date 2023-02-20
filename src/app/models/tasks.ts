export class Tasks {
  title: string;
  description: string;
  descriptionLength: number;
  date: number;
  category: any;
  assignedTo: any;
  prio: string;
  subtasks: any;
  colum: string;
  subtaskTrue: number = 0;

  constructor(obj?: any) {
    // das Fragezeichen als optionales Argument und kann daher auch ohne obj verwendet werden
    this.title = obj ? obj.title : ''; // obj = wenn es exestiert dann wird obj.firstName übergeben, wenn nicht dann '' (leerer string)
    this.description = obj ? obj.description : '';
    this.descriptionLength = obj ? obj.descriptionLength : '';
    this.date = obj ? obj.date : 0;
    this.category = obj ? obj.category : '';
    this.assignedTo = obj ? obj.assignedTo : [];
    this.prio = obj ? obj.prio : '';
    this.subtasks = obj ? obj.subtasks : [];
    this.colum = obj ? obj.colum : 'todo';
    this.subtaskTrue = obj ? obj.subtasks : 0;
  }

  public toJSON() {
    return {
      title: this.title,
      description: this.description,
      descriptionLength: this.descriptionLength,
      date: this.date,
      category: this.category,
      assignedTo: this.assignedTo,
      prio: this.prio,
      subtasks: this.subtasks,
      colum: this.colum,
      subtaskTrue: this.subtaskTrue,
    };
  }
}
