import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardService } from '../../services/board.service';
import { Board, Column } from '../../interfaces/kanban.interface';
import { AddTaskModalComponent } from '../add-task-modal/add-task-modal.component';
import { TaskForm } from '../../interfaces/task-form.interface';

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
    console.log('New task:', taskForm);
    // Implement task saving logic here
  }

  getCompletedSubtasks(task: any) {
    return task.subtasks.filter((subtask: any) => subtask.isCompleted).length;
  }
}

