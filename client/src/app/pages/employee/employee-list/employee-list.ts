import {Component, effect, signal} from '@angular/core';
import {Router} from '@angular/router';
import {EmployeeModel} from '../../../models/employee.model';
import {EmployeeService} from '../../../services/employee.service';
import {Spinner} from '../../../components/loading/spinner/spinner';


@Component({
  selector: 'app-employee-list',
  imports: [
    Spinner
  ],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
  standalone: true
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
        next: (data ) => {
          console.log(data);
          this.employees.set(data)
        },
        error: (error) => {
          console.error('There was an error!', error);

          if(error.error.redirectUrl)
          {
            this.router.navigate([error.error.redirectUrl]);
          }

          this.errorMessage.set('Error fetching employees.');
        }
      });

    });
  }

  viewEmployeeDetails(employeeID: number){
    this.router.navigate(['/employees', employeeID])
  }

}
