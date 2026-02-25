import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EmployeeModel} from "../models/employee.model";
import {ComponentModel} from '../models/component.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService
{
  private apiUrl = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): { headers?: HttpHeaders }
  {
    const token = localStorage.getItem('token');
    if (!token)
    {
      return {};
    }

    return {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    };
  }

  getEmployees(): Observable<EmployeeModel[]>
  {
    console.log('Fetching employees with auth headers:', this.getAuthHeaders());
    return this.http.get<EmployeeModel[]>(this.apiUrl, this.getAuthHeaders());
  }

    getEmployeeById(employeeID: number): Observable<EmployeeModel>
  {
    const escapedEmployeeID = encodeURIComponent(employeeID);
    return this.http.get<EmployeeModel>(`${this.apiUrl}/${escapedEmployeeID}`, this.getAuthHeaders());
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

  registerEmployee(employeeData: any): Observable<EmployeeModel>
  {
    return this.http.put<EmployeeModel>(`${this.apiUrl}/register`, employeeData);
  }

  loginEmployee(credentials: any): Observable<{ token: string; user: EmployeeModel }>
  {
    return this.http.post<{ token: string; user: EmployeeModel }>(`${this.apiUrl}/login`, credentials);
  }

}
