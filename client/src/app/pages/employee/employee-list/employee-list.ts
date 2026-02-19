import {Component, effect, signal} from '@angular/core';
import {Router} from '@angular/router';
import {EmployeeModel} from '../../../models/employee.model';
import {EmployeeService} from '../../../services/employee.service';


@Component({
  selector: 'app-employee-list',
  imports: [
  ],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList {
  employees = signal<EmployeeModel[]>([]);
  errorMessage = signal<string>('');

  constructor(private employeeService: EmployeeService, private router: Router)
  {
    //reactive function, runs when created, reruns when any signals inside of the effect change
    effect(() =>
    {
      //benefits of subscribing to an observable is that when it changes it will automatically be called
      this.employeeService.getEmployees().subscribe({
        next: (data ) => this.employees.set(data),
        error: (error) => {
          this.errorMessage.set('Error fetching employees.');
          console.error('There was an error!', error);
        }
      });

    });
  }

  viewEmployeeDetails(employeeID: number){
    this.router.navigate(['/employees', employeeID])
  }

}
