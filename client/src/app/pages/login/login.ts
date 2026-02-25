import { Component } from '@angular/core';
import {EmployeeModel} from '../../models/employee.model';
import {EmployeeService} from '../../services/employee.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  employee: { employeeID: number; employeeUsername: string; employeePassword: string } = {
      employeeID: 0,
    employeeUsername: '',
    employeePassword: '',
  };

  errorMessage = '';

  constructor(private employeeService: EmployeeService, private router: Router) {}

  onLogin(): void
  {
    this.employeeService.loginEmployee(this.employee).subscribe({
      next: (response) =>
      {
        console.log(response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('employee', JSON.stringify(response.user));
        if (response.user.employeeIsAdmin)
        {
          this.router.navigate(['']); // Redirect to admin dashboard if user is an admin
        }
        else {
          this.router.navigate(['/plant', response.user.plantID]);
        }

      },
      error: (err) =>
      {
        this.errorMessage = 'Login failed: Invalid username or password';
      },
    });

  }

  redirectToRegister(): void
  {
    this.router.navigate(['/register']);
  }

}
