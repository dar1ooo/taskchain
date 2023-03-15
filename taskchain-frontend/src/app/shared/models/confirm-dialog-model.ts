export class ConfirmDialogModel {
  constructor(init?: Partial<ConfirmDialogModel>) {
    Object.assign(this, init);
  }
  public title: string = '';
  public message: string = '';
}
