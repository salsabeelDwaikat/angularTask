import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../interfaces/kanban.interface';

@Component({
  selector: 'app-view-task-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-task-modal.component.html',
  styleUrls: ['./view-task-modal.component.scss']
})
export class ViewTaskModalComponent {
  @Input() task!: Task;
  @Output() close = new EventEmitter<void>();
  @Output() statusChange = new EventEmitter<string>();
  @Output() subtaskToggle = new EventEmitter<{index: number, checked: boolean}>();

  getCompletedSubtasks(): number {
    return this.task.subtasks.filter(subtask => subtask.isCompleted).length;
  }

  onStatusChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.statusChange.emit(select.value);
  }

  onSubtaskToggle(index: number, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.subtaskToggle.emit({ index, checked: checkbox.checked });
  }
}

