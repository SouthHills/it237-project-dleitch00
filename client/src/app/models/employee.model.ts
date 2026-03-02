export interface EmployeeModel
{
  employeeID: number;
  employeeJobTitle: string;
  employeeStatus: string;
  employeeIsAdmin: string;
  employeeFirstName: string;
  employeeMiddleInitial: string;
  employeeLastName: string;
  employeeSalary: number;
  employeeBirthday: Date;
  employeeUsername: string;
  employeeToken: string | null;
  employeePassword?: string | null;
  plantID: number | null;
}
