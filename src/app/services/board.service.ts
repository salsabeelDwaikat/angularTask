import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Board, Task, Column } from '../interfaces/kanban.interface';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private boards: Board[] = [
    { id: '1', name: 'Platform Launch', isActive: true },
    { id: '2', name: 'Marketing Plan' },
    { id: '3', name: 'Roadmap' }
  ];

  private tasks: Task[] = [
    {
      id: '1',
      title: 'Build UI for onboarding flow',
      subtasks: [
        { title: 'Subtask 1', isCompleted: false },
        { title: 'Subtask 2', isCompleted: false },
        { title: 'Subtask 3', isCompleted: false }
      ],
      status: 'TODO'
    },
    {
      id: '2',
      title: 'Build UI for search',
      subtasks: [
        { title: 'Subtask 1', isCompleted: false }
      ],
      status: 'TODO'
    },
    {
      id: '3',
      title: 'Build settings UI',
      subtasks: [
        { title: 'Subtask 1', isCompleted: false },
        { title: 'Subtask 2', isCompleted: false }
      ],
      status: 'TODO'
    },
    {
      id: '4',
      title: 'QA and test all major user journeys',
      subtasks: [
        { title: 'Subtask 1', isCompleted: false },
        { title: 'Subtask 2', isCompleted: false }
      ],
      status: 'TODO'
    },
    // DOING tasks
    {
      id: '5',
      title: 'Design settings and search pages',
      subtasks: [
        { title: 'Subtask 1', isCompleted: true },
        { title: 'Subtask 2', isCompleted: false },
        { title: 'Subtask 3', isCompleted: false }
      ],
      status: 'DOING'
    },
    // Add other tasks here...
  ];

  private columns: Column[] = [
    { name: 'TODO', tasks: [], color: '#49C4E5' },
    { name: 'DOING', tasks: [], color: '#8471F2' },
    { name: 'DONE', tasks: [], color: '#67E2AE' }
  ];

  private boardsSubject = new BehaviorSubject<Board[]>(this.boards);
  private columnsSubject = new BehaviorSubject<Column[]>(this.processColumns());

  boards$ = this.boardsSubject.asObservable();
  columns$ = this.columnsSubject.asObservable();

  private processColumns(): Column[] {
    return this.columns.map(column => ({
      ...column,
      tasks: this.tasks.filter(task => task.status === column.name)
    }));
  }
}

