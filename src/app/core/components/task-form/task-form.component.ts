import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TaskInterface } from '../../interfaces/TaskInterface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';


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

    private dialogRef = inject<MatDialogRef<TaskFormComponent>>(MatDialogRef, { optional: true });

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(80)]],
    descripcion: ['', [Validators.required, Validators.maxLength(500)]],
    prioridad: ['mediana', [Validators.required]],
    fechaLimite: [null as Date | null, []],
  });

  hoy = new Date();

  submit(): void {
    if (this.form.invalid) return;

    const value = this.form.value as TaskInterface;
    console.log('TaskInterface:', value);
    this.dialogRef?.close();
  }

  cancelar(): void {
    this.dialogRef?.close();
  }
}
