import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EmployeeModel} from "../models/employee.model";
import {ComponentModel} from '../models/component.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService
{
  private apiUrl = 'http://localhost:3000/employees';

  constructor(private http: HttpClient)
  {
  }

  getEmployees(): Observable<EmployeeModel[]>
  {
    return this.http.get<EmployeeModel[]>(this.apiUrl);
  }

    getEmployeeById(employeeID: number): Observable<EmployeeModel>
  {
    const escapedEmployeeID = encodeURIComponent(employeeID);
    return this.http.get<EmployeeModel>(`${this.apiUrl}/${escapedEmployeeID}`);
  }

  addEmployee(employee: EmployeeModel): Observable<EmployeeModel>
  {
    return this.http.post<EmployeeModel>(this.apiUrl, employee);
  }

  updateEmployee(employee: EmployeeModel): Observable<EmployeeModel>
  {
    const escapedEmployeeID = encodeURIComponent(employee.employeeID);
    return this.http.put<EmployeeModel>(`${this.apiUrl}/${escapedEmployeeID}`, employee);
  }

  deleteEmployee(employeeID: number): Observable<EmployeeModel>
  {
    const escapedEmployeeID = encodeURIComponent(employeeID);
    return this.http.delete<EmployeeModel>(`${this.apiUrl}/${escapedEmployeeID}`);
  }

}
