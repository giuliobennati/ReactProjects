// db.ts
import Dexie, { Table } from 'dexie';
import { ITask } from './Interfaces';

export class TaskDb extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  tasks!: Table<ITask>; 

  constructor() {
    super('taskStorage');

    this.version(1).stores({
      tasks: '++id, title, dateCreation, status' // Primary key and indexed props
    });
  }
}

export const taskDb = new TaskDb();