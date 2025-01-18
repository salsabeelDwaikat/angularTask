import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardService } from '../../services/board.service';
import { Board, Column, Task, TaskForm } from '../../interfaces/kanban.interface';
import { AddTaskModalComponent } from '../add-task-modal/add-task-modal.component';
import { ViewTaskModalComponent } from '../view-task-modal/view-task-modal.component';

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [CommonModule, AddTaskModalComponent, ViewTaskModalComponent],
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit {
  boards: Board[] = [];
  columns: Column[] = [];
  showSidebar = true;
  isDarkMode = true;
  showAddTaskModal = false;
  selectedTask: Task | null = null;

  constructor(private boardService: BoardService, private renderer: Renderer2) {}

  ngOnInit() {
    this.boardService.boards$.subscribe(boards => this.boards = boards);
    this.boardService.columns$.subscribe(columns => this.columns = columns);
    this.loadThemePreference();
    this.applyTheme();
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.saveThemePreference();
    this.applyTheme();
  }

  private loadThemePreference() {
    const savedTheme = localStorage.getItem('isDarkMode');
    if (savedTheme !== null) {
      this.isDarkMode = JSON.parse(savedTheme);
    }
  }

  private saveThemePreference() {
    localStorage.setItem('isDarkMode', JSON.stringify(this.isDarkMode));
  }

  private applyTheme() {
    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark-theme');
      this.renderer.removeClass(document.body, 'light-theme');
    } else {
      this.renderer.addClass(document.body, 'light-theme');
      this.renderer.removeClass(document.body, 'dark-theme');
    }
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
      description: taskForm.description,
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

  openViewTaskModal(task: Task) {
    this.selectedTask = task;
  }

  closeViewTaskModal() {
    this.selectedTask = null;
  }

  onStatusChange(taskId: string, newStatus: string) {
    this.boardService.updateTask(taskId, { 
      status: newStatus as 'TODO' | 'DOING' | 'DONE' 
    });
  }

  onSubtaskToggle(taskId: string, data: {index: number, checked: boolean}) {
    this.boardService.updateSubtask(taskId, data.index, data.checked);
  }
}

