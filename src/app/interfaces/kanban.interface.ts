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
  
  