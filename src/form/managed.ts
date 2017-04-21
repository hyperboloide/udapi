import { Session, HTTPPromise } from '../http';
import { Update, Remove } from './index';
import { Form } from './form';


export class EditableForm extends Form {

  protected s: Session;

  constructor(s: Session) {
    super();
    this. s = s;
  }

  update(): HTTPPromise<EditableForm> {
    return Update(this.s, this);
  }

  remove(): HTTPPromise<any> {
    return Remove(this.s, this.url);
  }

}
