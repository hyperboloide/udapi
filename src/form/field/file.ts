import { isEmpty } from 'lodash';

import { Field } from './field';

export const FileType = "file";

export class File extends Field {

  type(): string {
    return FileType;
  }

}
