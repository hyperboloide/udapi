import { Form, State } from '../form';
import { User } from '../user';

export class Instance {
  readonly form: Form;

  id: string = '';
  created?: Date;
  updated?: Date;
  proto: number = 2;
  formVersion: number;
  version: number = 0;
  creator?: User;
  updator?: User;
  state: State;

  constructor(form: Form) {
    this.form = form;
    this.formVersion = form.version;
    this.state = form.fsm.initial;
  }

}
