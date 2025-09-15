import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from '../../core/components/task-form/task-form.component';
import { TaskListComponent } from '../../core/components/task-list/task-list.component';

@Component({
  selector: 'app-home-page',
  imports: [
    HeaderComponent,
    MatGridListModule,
    CommonModule,
    TaskListComponent,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  constructor(private dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(TaskFormComponent, {
      width: '600px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      disableClose: true,
      closeOnNavigation: false,
      autoFocus: false,
    });
  }
}
