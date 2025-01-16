import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardService } from '../../services/board.service';
import { Board, Column, Task, TaskForm } from '../../interfaces/kanban.interface';
import { AddTaskModalComponent } from '../add-task-modal/add-task-modal.component';

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [CommonModule, AddTaskModalComponent],
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit {
  boards: Board[] = [];
  columns: Column[] = [];
  showSidebar = true;
  isDarkMode = true;
  showAddTaskModal = false;

  constructor(private boardService: BoardService) {}

  ngOnInit() {
    this.boardService.boards$.subscribe(boards => this.boards = boards);
    this.boardService.columns$.subscribe(columns => this.columns = columns);
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }

  openAddTaskModal() {
    this.showAddTaskModal = true;
  }

  closeAddTaskModal() {
    this.showAddTaskModal = false;
  }

  onTaskSave(taskForm: TaskForm) {
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskForm.title,
      subtasks: taskForm.subtasks.map(title => ({
        title,
        isCompleted: false
      })),
      status: taskForm.status
    };
    
    this.boardService.addTask(newTask);
    this.closeAddTaskModal();
  }

  getCompletedSubtasks(task: Task) {
    return task.subtasks.filter(subtask => subtask.isCompleted).length;
  }
}

