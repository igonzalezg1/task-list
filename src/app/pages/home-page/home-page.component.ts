import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from '../../core/components/task-list/task-list.component';

@Component({
  selector: 'app-home-page',
  imports: [HeaderComponent, MatGridListModule, CommonModule, TaskListComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
