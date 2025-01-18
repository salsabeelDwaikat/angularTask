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
      description: 'This needs to be done first before we can move on to other tasks.',
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
      description: 'Implement search functionality with filters and sorting.',
      subtasks: [
        { title: 'Subtask 1', isCompleted: false }
      ],
      status: 'TODO'
    },
    {
      id: '3',
      title: 'Build settings UI',
      description: 'Create a settings page with user preferences and configuration options.',
      subtasks: [
        { title: 'Subtask 1', isCompleted: false },
        { title: 'Subtask 2', isCompleted: false }
      ],
      status: 'TODO'
    },
    {
      id: '4',
      title: 'QA and test all major user journeys',
      description: 'Ensure all user flows are working correctly and fix any bugs.',
      subtasks: [
        { title: 'Subtask 1', isCompleted: false },
        { title: 'Subtask 2', isCompleted: false }
      ],
      status: 'TODO'
    },
    {
      id: '5',
      title: 'Design settings and search pages',
      description: 'Create mockups for the settings and search page interfaces.',
      subtasks: [
        { title: 'Subtask 1', isCompleted: true },
        { title: 'Subtask 2', isCompleted: false },
        { title: 'Subtask 3', isCompleted: false }
      ],
      status: 'DOING'
    },
    {
      id: '6',
      title: 'Add account management endpoints',
      description: 'Implement API endpoints for user account management.',
      subtasks: [
        { title: 'Subtask 1', isCompleted: true },
        { title: 'Subtask 2', isCompleted: true },
        { title: 'Subtask 3', isCompleted: false }
      ],
      status: 'DOING'
    },
    {
      id: '7',
      title: 'Design onboarding flow',
      description: 'Create a smooth onboarding experience for new users.',
      subtasks: [
        { title: 'Subtask 1', isCompleted: true },
        { title: 'Subtask 2', isCompleted: false },
        { title: 'Subtask 3', isCompleted: false }
      ],
      status: 'DOING'
    },
    {
      id: '8',
      title: 'Add search endpoints',
      description: 'Implement backend API endpoints for search functionality.',
      subtasks: [
        { title: 'Subtask 1', isCompleted: true },
        { title: 'Subtask 2', isCompleted: false }
      ],
      status: 'DOING'
    },
    {
      id: '9',
      title: 'Add authentication endpoints',
      description: 'Implement secure authentication endpoints for user login.',
      subtasks: [
        { title: 'Subtask 1', isCompleted: true },
        { title: 'Subtask 2', isCompleted: false }
      ],
      status: 'DOING'
    },
    {
      id: '10',
      title: 'Research pricing points',
      description: 'Analyze competitor pricing and determine optimal price points.',
      subtasks: [
        { title: 'Subtask 1', isCompleted: true },
        { title: 'Subtask 2', isCompleted: false },
        { title: 'Subtask 3', isCompleted: false }
      ],
      status: 'DOING'
    },
    {
      id: '11',
      title: 'Conduct 5 wireframe tests',
      description: 'Test wireframes with users and gather feedback.',
      subtasks: [
        { title: 'Subtask 1', isCompleted: true }
      ],
      status: 'DONE'
    },
    {
      id: '12',
      title: 'Create wireframe prototype',
      description: 'Design initial wireframes for key features.',
      subtasks: [
        { title: 'Subtask 1', isCompleted: true }
      ],
      status: 'DONE'
    },
    {
      id: '13',
      title: 'Review results of usability tests',
      description: 'Analyze usability test results and implement improvements.',
      subtasks: [
        { title: 'Subtask 1', isCompleted: true },
        { title: 'Subtask 2', isCompleted: true },
        { title: 'Subtask 3', isCompleted: true }
      ],
      status: 'DONE'
    }
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

  addTask(task: Task) {
    this.tasks.push(task);
    this.columnsSubject.next(this.processColumns());
  }

  updateTask(taskId: string, updates: Partial<Task>) {
    this.tasks = this.tasks.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    );
    this.columnsSubject.next(this.processColumns());
  }

  updateSubtask(taskId: string, subtaskIndex: number, isCompleted: boolean) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.subtasks[subtaskIndex].isCompleted = isCompleted;
      this.columnsSubject.next(this.processColumns());
    }
  }
}

