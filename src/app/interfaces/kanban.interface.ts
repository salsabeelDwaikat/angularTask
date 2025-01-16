export interface Board {
    id: string;
    name: string;
    isActive?: boolean;
  }
  
  export interface Subtask {
    title: string;
    isCompleted: boolean;
  }
  
  export interface Task {
    id: string;
    title: string;
    subtasks: Subtask[];
    status: 'TODO' | 'DOING' | 'DONE';
  }
  
  export interface Column {
    name: 'TODO' | 'DOING' | 'DONE';
    tasks: Task[];
    color: string;
  }
  
  export interface TaskForm {
    title: string;
    description: string;
    subtasks: string[];
    status: 'TODO' | 'DOING' | 'DONE';
  }
  
  