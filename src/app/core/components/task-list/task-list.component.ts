import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskServiceService } from '../../services/task-service.service';
import { TaskEntity } from '../../interfaces/TaskInterface';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskStatus } from '../../types/TaskTypes';

@Component({
  selector: 'app-task-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  private service = inject(TaskServiceService);
  private dialog = inject(MatDialog);

  displayedColumns = [
    'nombre',
    'descripcion',
    'prioridad',
    'fechaLimite',
    'fechaCreacion',
    'status',
    'actions',
  ];
  dataSource = new MatTableDataSource<TaskEntity>([]);

  constructor() {
    this.service.tasks$.subscribe((tasks) => {
      this.dataSource.data = tasks;
    });
  }

  openEdit(task: TaskEntity) {
    const ref = this.dialog.open(TaskFormComponent, {
      width: '640px',
      maxWidth: '95vw',
      data: task,
      disableClose: true,
      autoFocus: false,
    });
    ref.afterClosed().subscribe((draft) => {
      if (!draft) return;
      this.service.update(task.id, draft);
    });
  }

  delete(task: TaskEntity) {
    if (confirm(`¿Eliminar la tarea "${task.nombre}"?`)) {
      this.service.remove(task.id);
    }
  }

  changeStatus(task: TaskEntity, status: TaskStatus) {
    this.service.setStatus(task.id, status);
  }

  trackRow(_i: number, row: TaskEntity) {
    return row.id;
  }
}
