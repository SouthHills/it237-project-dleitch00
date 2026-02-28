import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Navbar} from './components/navbar/navbar';
import {Header} from './components/header/header';
import {EmployeeService} from './services/employee.service';
import {UserNavbar} from './components/user-navbar/user-navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Header, UserNavbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('client');

  constructor(protected employeeService: EmployeeService) {}

  get isAdmin(): boolean {
    return this.employeeService.isAdmin;
  }

  get currentPlantID(): number | null {
    return this.employeeService.currentPlantID;
  }
}
