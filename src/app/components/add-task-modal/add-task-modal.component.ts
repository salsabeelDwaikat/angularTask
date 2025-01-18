import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskForm } from '../../interfaces/task-form.interface';

@Component({
  selector: 'app-add-task-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.scss']
})
export class AddTaskModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<TaskForm>();

  taskForm: TaskForm = {
    title: '',
    description: '',
    subtasks: ['', ''],
    status: 'TODO'
  };

  addSubtask() {
    this.taskForm.subtasks.push('');
  }

  removeSubtask(index: number) {
    this.taskForm.subtasks.splice(index, 1);
  }

  onSubmit() {
    if (this.taskForm.title.trim()) {
      this.save.emit(this.taskForm);
      this.close.emit();
    }
  }
}

