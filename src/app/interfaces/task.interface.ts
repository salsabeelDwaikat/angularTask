export interface Subtask {
    title: string;
    completed: boolean;
  }
  
  export interface Task {
    id: string;
    title: string;
    subtasks: Subtask[];
    completedSubtasks: number;
    totalSubtasks: number;
  }
  
  export interface Board {
    id: string;
    name: string;
    active?: boolean;
  }
  
  export interface Column {
    name: string;
    tasks: Task[];
    count: number;
  }
  
  