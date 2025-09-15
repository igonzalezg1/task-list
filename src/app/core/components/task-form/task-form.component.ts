import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TaskEntity, TaskInterface } from '../../interfaces/TaskInterface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { TaskServiceService } from '../../services/task-service.service';

@Component({
  selector: 'app-task-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDialogModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
  private fb = inject(FormBuilder);
  private tasks = inject(TaskServiceService);
  private dialogRef = inject<MatDialogRef<TaskFormComponent>>(MatDialogRef, {
    optional: true,
  });

  private data = inject(MAT_DIALOG_DATA, {
    optional: true,
  }) as Partial<TaskEntity> | null;

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(80)]],
    descripcion: ['', [Validators.required, Validators.maxLength(500)]],
    prioridad: ['mediana', [Validators.required]],
    fechaLimite: [null as Date | null, []],
  });

  hoy = new Date();

  cconstructor() {
    if (this.data) {
      this.form.patchValue({
        nombre: this.data.nombre,
        descripcion: this.data.descripcion,
        prioridad: this.data.prioridad,
        fechaLimite: this.data.fechaLimite ?? null,
      });
    }
  }

  submit(): void {
    if (this.form.invalid) return;

    const draft = this.form.value as TaskInterface;
    let result: TaskEntity | undefined;

    if (this.data?.id) {
      // UPDATE.
      result = this.tasks.update(this.data.id, {
        nombre: draft.nombre,
        descripcion: draft.descripcion,
        prioridad: draft.prioridad,
        fechaLimite: draft.fechaLimite,
      })!;
    } else {
      // CREATE.
      result = this.tasks.create(draft);
    }

    this.dialogRef?.close(result);
  }

  cancelar(): void {
    this.dialogRef?.close();
  }
}
