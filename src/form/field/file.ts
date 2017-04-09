import { isEmpty } from 'lodash';

import { Field } from './field';

export class File extends Field {

  type(): string {
    return "file";
  }

}
