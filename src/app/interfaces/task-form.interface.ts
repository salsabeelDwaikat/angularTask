export interface TaskForm {
    title: string;
    description: string;
    subtasks: string[];
    status: 'TODO' | 'DOING' | 'DONE';
  }
  
  