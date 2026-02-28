import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {EmployeeService} from '../services/employee.service';

export const authGuard: CanActivateFn = (_route, state) => {
  const token = localStorage.getItem('token');

  const employeeService = inject(EmployeeService);
  if (employeeService.isAdmin && token)
  {
    return true;
  }

  const router = inject(Router);
  return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
}

export const authDashboardGuard: CanActivateFn = (_route, state) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);
  if (!token)  {
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  }


  const employeeService = inject(EmployeeService);
  if (token && employeeService.isAdmin)
  {
    return true;
  }


  return router.createUrlTree([`/plants/${employeeService.currentPlantID}`], { queryParams: { returnUrl: state.url } });
}
