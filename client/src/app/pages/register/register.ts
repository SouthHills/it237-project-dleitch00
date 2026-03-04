import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {EmployeeService} from '../../services/employee.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  employee: { employeeID: number; employeeUsername: string; employeePassword: string } = {
    employeeID: 0,
    employeeUsername: '',
    employeePassword: ''
  };

  constructor(private router: Router, private employeeService: EmployeeService) {}

  onRegister(): void
  {
    this.employeeService.registerEmployee(this.employee).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        alert('Registration successful! Please log in.');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration failed:', error);
        alert('Registration failed. Please try again.');
      }
    });

  }

  redirectToLogin(): void
  {
    this.router.navigate(['/login']);
  }

}
