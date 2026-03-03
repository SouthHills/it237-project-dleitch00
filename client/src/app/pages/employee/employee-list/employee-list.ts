import {Component, effect, signal} from '@angular/core';
import {Router} from '@angular/router';
import {EmployeeModel} from '../../../models/employee.model';
import {EmployeeService} from '../../../services/employee.service';
import {Spinner} from '../../../components/loading/spinner/spinner';
import {CurrencyPipe} from '@angular/common';


@Component({
  selector: 'app-employee-list',
  imports: [
    Spinner,
    CurrencyPipe
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

  idSort = false

  sortID()
  {
    if (this.idSort)
    {
      const sortedEmployees = [...this.employees()].sort((a, b) => b.employeeID - a.employeeID);
      this.employees.set(sortedEmployees);
      this.idSort = false;
      return;
    }
    const sortedEmployees = [...this.employees()].sort((a, b) => a.employeeID - b.employeeID);
    this.idSort = true;
    this.employees.set(sortedEmployees);
  }

  fNameSort = false

  sortFirstName()
  {
    if (this.fNameSort)
    {
      const sortedEmployees = [...this.employees()].sort((a, b) => b.employeeFirstName.localeCompare(a.employeeFirstName));
      this.employees.set(sortedEmployees);
      this.fNameSort = false;
      return;
    }
    const sortedEmployees = [...this.employees()].sort((a, b) => a.employeeFirstName.localeCompare(b.employeeFirstName));
    this.fNameSort = true;
    this.employees.set(sortedEmployees);
  }

  lNameSort = false

  sortLastName()
  {
    if (this.lNameSort)
    {
      const sortedEmployees = [...this.employees()].sort((a, b) => b.employeeLastName.localeCompare(a.employeeLastName));
      this.employees.set(sortedEmployees);
      this.lNameSort = false;
      return;
    }
    const sortedEmployees = [...this.employees()].sort((a, b) => a.employeeLastName.localeCompare(b.employeeLastName));
    this.lNameSort = true;
    this.employees.set(sortedEmployees);
  }

  initialSort = false

  sortInitial()
  {
    if (this.initialSort)    {
      const sortedEmployees = [...this.employees()].sort((a, b) => b.employeeMiddleInitial.localeCompare(a.employeeMiddleInitial));
      this.employees.set(sortedEmployees);
      this.initialSort = false;
      return;
    }
    const sortedEmployees = [...this.employees()].sort((a, b) => a.employeeMiddleInitial.localeCompare(b.employeeMiddleInitial));
    this.initialSort = true;
    this.employees.set(sortedEmployees);
  }

  jobSort = false;
  sortJob()  {
    if (this.jobSort)
    {
      const sortedEmployees = [...this.employees()].sort((a, b) => b.employeeJobTitle.localeCompare(a.employeeJobTitle));
      this.employees.set(sortedEmployees);
      this.jobSort = false;
      return;
    }
    const sortedEmployees = [...this.employees()].sort((a, b) => a.employeeJobTitle.localeCompare(b.employeeJobTitle));
    this.jobSort = true;
    this.employees.set(sortedEmployees);
  }

  salarySort = false;
  sortSalary()  {
    if (this.salarySort)
    {
      const sortedEmployees = [...this.employees()].sort((a, b) => b.employeeSalary - a.employeeSalary);
      this.employees.set(sortedEmployees);
      this.salarySort = false;
      return;
    }
    const sortedEmployees = [...this.employees()].sort((a, b) => a.employeeSalary - b.employeeSalary);
    this.salarySort = true;
    this.employees.set(sortedEmployees);
  }

  dobSort = false;
  sortDOB()  {
    if (this.dobSort)
    {
      const sortedEmployees = [...this.employees()].sort((a, b) => new Date(b.employeeBirthday).getTime() - new Date(a.employeeBirthday).getTime());
      this.employees.set(sortedEmployees);
      this.dobSort = false;
      return;
    }
    const sortedEmployees = [...this.employees()].sort((a, b) => new Date(a.employeeBirthday).getTime() - new Date(b.employeeBirthday).getTime());
    this.dobSort = true;
    this.employees.set(sortedEmployees);
   }

   activeSort = false;
   sortActive()  {
    if (this.activeSort)
    {
      const sortedEmployees = [...this.employees()].sort((a, b) => b.employeeStatus.localeCompare(a.employeeStatus));
      this.employees.set(sortedEmployees);
      this.activeSort = false;
      return;
    }
    const sortedEmployees = [...this.employees()].sort((a, b) => a.employeeStatus.localeCompare(b.employeeStatus));
    this.activeSort = true;
    this.employees.set(sortedEmployees);
   }

   adminSort = false;
   sortAdmin()  {
    if (this.adminSort)
    {
      const sortedEmployees = [...this.employees()].sort((a, b) => b.employeeIsAdmin.localeCompare(a.employeeIsAdmin));
      this.employees.set(sortedEmployees);
      this.adminSort = false;
      return;
    }
    const sortedEmployees = [...this.employees()].sort((a, b) => a.employeeIsAdmin.localeCompare(b.employeeIsAdmin));
    this.adminSort = true;
    this.employees.set(sortedEmployees);
   }

   usernameSort = false;
   sortUsername()  {
    if (this.usernameSort)
    {
      const sortedEmployees = [...this.employees()].sort((a, b) => b.employeeUsername.localeCompare(a.employeeUsername));
      this.employees.set(sortedEmployees);
      this.usernameSort = false;
      return;
    }
    const sortedEmployees = [...this.employees()].sort((a, b) => a.employeeUsername.localeCompare(b.employeeUsername));
    this.usernameSort = true;
    this.employees.set(sortedEmployees);
   }

   plantSort = false;
   sortPlantID()  {
    if (this.plantSort)    {
      const sortedEmployees = [...this.employees()].sort((a, b) => b.plantID! - a.plantID!);
      this.employees.set(sortedEmployees);
      this.plantSort = false;
      return;
    }
    const sortedEmployees = [...this.employees()].sort((a, b) => a.plantID! - b.plantID!);
    this.plantSort = true;
    this.employees.set(sortedEmployees);
   }

}
