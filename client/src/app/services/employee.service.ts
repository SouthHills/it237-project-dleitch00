import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EmployeeModel} from "../models/employee.model";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService
{
  private apiUrl = environment.apiUrl + '/employees';

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

  get isAdmin(): boolean
  {
    const employeeData = localStorage.getItem('employee');
    if (!employeeData)
    {
      return false;
    }

    const employee: EmployeeModel = JSON.parse(employeeData);
    return employee.employeeIsAdmin === 'Y';

  }

  get currentPlantID(): number | null
  {
    const employeeData = localStorage.getItem('employee');
    if (!employeeData)
    {
      return null;
    }

    const employee: EmployeeModel = JSON.parse(employeeData);
    return employee.plantID;
  }


  getEmployees(): Observable<EmployeeModel[]>
  {
    return this.http.get<EmployeeModel[]>(this.apiUrl);
  }


    getEmployeeById(employeeID: number): Observable<EmployeeModel>
  {
    const escapedEmployeeID = encodeURIComponent(employeeID);
    return this.http.get<EmployeeModel>(`${this.apiUrl}/${escapedEmployeeID}`, this.getAuthHeaders());
  }

  addEmployee(employee: EmployeeModel): Observable<EmployeeModel>
  {
    return this.http.post<EmployeeModel>(this.apiUrl, employee, this.getAuthHeaders());
  }

  updateEmployee(employee: EmployeeModel): Observable<EmployeeModel>
  {
    const escapedEmployeeID = encodeURIComponent(employee.employeeID);
    return this.http.put<EmployeeModel>(`${this.apiUrl}/${escapedEmployeeID}`, employee, this.getAuthHeaders());
  }

  deleteEmployee(employeeID: number): Observable<EmployeeModel>
  {
    const escapedEmployeeID = encodeURIComponent(employeeID);
    return this.http.delete<EmployeeModel>(`${this.apiUrl}/${escapedEmployeeID}`, this.getAuthHeaders());
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
