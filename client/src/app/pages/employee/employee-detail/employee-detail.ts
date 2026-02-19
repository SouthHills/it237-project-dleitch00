import {Component, effect, signal} from '@angular/core';

import {ActivatedRoute, Router, RouterLink} from '@angular/router';

import {Toast} from 'bootstrap';
import {EmployeeModel} from '../../../models/employee.model';
import {EmployeeService} from '../../../services/employee.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-employee-detail',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './employee-detail.html',
  styleUrl: './employee-detail.css',
})
export class EmployeeDetail {
  employee = signal<EmployeeModel | null>(null);
  modifiedEmployee = signal<EmployeeModel>({} as EmployeeModel);

  errorMessage = signal<string>('');
  isNewEmployee = signal<boolean>(false);

  // Toast State
  toastTitle = signal<string>('');
  toastMessage = signal<string>('');

  // Route parameter stored as a signal
  employeeID = signal<string | null>(null);

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  )
  {                       // snapshot of the route when requesting the object
    this.employeeID.set(this.route.snapshot.paramMap.get('id'));

    effect(() =>
    {
      const id = this.employeeID();
      if (id === '-1')
      {
        this.isNewEmployee.set(true);
        this.employee.set(null);
        this.modifiedEmployee.set({} as EmployeeModel);
      }
      else
      {
        this.isNewEmployee.set(false);

        this.employeeService.getEmployeeById(Number(id)).subscribe({
          next: (data) => {
            this.employee.set(data);
            this.modifiedEmployee.set({ ...data }); // cloning for editing

            this.errorMessage.set('');

          },
          error: (error) => {
            this.errorMessage.set('Error fetching the employee');
            console.error('There was an error!', error);
          }
        });
      }


    });
  }

  saveChanges(): void
  {
    const currentEmployee = this.modifiedEmployee();

    if (this.isNewEmployee())
    {
      if (
        !currentEmployee.employeeID ||
        !currentEmployee.employeeStatus ||
        currentEmployee.employeeSalary === undefined ||
        currentEmployee.employeeSalary === null ||
        !currentEmployee.employeeBirthday ||
        !currentEmployee.employeeFirstName ||
        !currentEmployee.employeeLastName ||
        !currentEmployee.employeeMiddleInitial ||
        !currentEmployee.employeeJobTitle ||
        !currentEmployee.employeeStatus ||
        !currentEmployee.employeeIsAdmin ||
        !currentEmployee.employeeUsername ||
        !currentEmployee.employeePassword
      )
      {
        this.errorMessage.set('Values are required for all attributes except Plant ID');
        this.toastTitle.set('Error')
        this.toastMessage.set(this.errorMessage());
        this.showToast();
        return;
      }

      this.employeeService.addEmployee(currentEmployee).subscribe({
        next: (newEmployee) =>
        {
          this.toastTitle.set('Employee information');
          this.toastMessage.set('Employee created successfully.');
          this.showToast();

          setTimeout(() =>
          {
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
              this.router.navigate(['/employees', newEmployee.employeeID]));
          }, 2000);
        },
        error: (error) =>
        {
          console.error('Error creating employee: ', error);
          this.errorMessage.set('Error creating the employee.');
          this.toastTitle.set('Error');
          this.toastMessage.set(this.errorMessage());
          this.showToast();
        }
      });

      return;
    }

    // Update existing employee
    this.employeeService.updateEmployee(currentEmployee).subscribe({
      next: (updatedEmployee) =>
      {
        this.employee.set({...updatedEmployee });
        this.modifiedEmployee.set({ ...updatedEmployee });
        this.toastTitle.set('Employee Information');
        this.toastMessage.set('Employee updated Successfully');
        this.showToast();
      },
      error: (error) =>
      {
        console.error('Error saving changes', error);
        this.errorMessage.set('Error updating the employee');
        this.toastTitle.set('Error');
        this.toastMessage.set('Error updating the employee');
        this.showToast();
      }
    });
  }

  deleteEmployee(): void
  {
    const currentEmployee = this.employee();
    if(!currentEmployee) return;

    const employeeID = currentEmployee.employeeID;

    this.employeeService.deleteEmployee(employeeID).subscribe({
      next: () =>
      {
        this.toastTitle.set('Employee Information');
        this.toastMessage.set('Employee deleted successfully');
        this.showToast();

        setTimeout(() =>
        {
          this.router.navigate(['/employees']);
        }, 2000)
      },
      error: (error) =>
      {
        console.error('Error deleting employee', error);
        this.errorMessage.set('Error deleting the employee.')
        this.toastTitle.set('Error');
        this.toastMessage.set(
          this.errorMessage() + ' (Is it being referenced by another entity?)0'
        );
        this.showToast();
      }
    });
  }

  discardChanges(): void
  {
    const original = this.employee();
    if(!original) return;

    this.modifiedEmployee.set({ ...original }); // creates a deep copy

    this.toastTitle.set('Employee Information');
    this.toastMessage.set('Changes discarded');
    this.showToast();
  }

  private showToast(): void
  {
    const toast = document.getElementById('toast');

    if (toast)
    {
      const toastBootstrap = Toast.getOrCreateInstance(toast);
      toastBootstrap.show();
    }
  }

}

