export class TaskModel {
  constructor(init?: Partial<TaskModel>) {
    Object.assign(this, init);
  }

  public isDone: boolean = false;
  public text: string = '';
}
