import { Routes } from '@angular/router';
import {Dashboard} from './pages/dashboard/dashboard';
import {ProductList} from './pages/product/product-list/product-list';
import {ProductDetail} from './pages/product/product-detail/product-detail';
import {ComponentList} from './pages/component/component-list/component-list';
import {ComponentDetail} from './pages/component/component-detail/component-detail';
import {EmployeeList} from './pages/employee/employee-list/employee-list';
import {EmployeeDetail} from './pages/employee/employee-detail/employee-detail';
import {PlantDetail} from './pages/plant/plant-detail/plant-detail';
import {PlantList} from './pages/plant/plant-list/plant-list';
import {VendorList} from './pages/vendor/vendor-list/vendor-list';
import {VendorDetail} from './pages/vendor/vendor-detail/vendor-detail';
import {Login} from './pages/login/login';
import {Register} from './pages/register/register';
import {authDashboardGuard, authGuard} from './guards/auth-guard';
import {ProductionLineList} from './pages/productionLine/production-line-list/production-line-list';
import {ProductionLineDetails} from './pages/productionLine/production-line-details/production-line-details';
import {BlueprintDetails} from './pages/blueprint/blueprint-details/blueprint-details';

export const routes: Routes = [
  { path: 'dashboard', redirectTo: '', pathMatch: "full"},
  { path: '', component: Dashboard, title: 'Dashboard', canActivate: [authDashboardGuard]},
  { path: 'login', component: Login, title: 'Login'},
  { path: 'register', component: Register, title: 'Register'},
  { path: 'products', component: ProductList, title: 'Product List', canActivate: [authGuard]},
  { path: 'products/:id', component: ProductDetail, title: 'Product Details', canActivate: [authGuard]},
  { path: 'components', component: ComponentList, title: 'Component List', canActivate: [authGuard]},
  { path: 'components/:id', component: ComponentDetail, title: 'Component Details', canActivate: [authGuard]},
  { path: 'employees', component: EmployeeList, title: 'Employee List', canActivate: [authGuard]},
  { path: 'employees/:id', component: EmployeeDetail, title: 'Employee Details', canActivate: [authGuard]},
  { path: 'plants', component: PlantList, title: 'Plant List', canActivate: [authGuard]},
  { path: 'plants/:id', component: PlantDetail, title: 'Plant Details'},
  { path: 'vendors', component: VendorList, title: 'Vendor List', canActivate: [authGuard]},
  { path: 'vendors/:id', component: VendorDetail, title: 'Vendor Details', canActivate: [authGuard]},
  { path: 'productionLines', component: ProductionLineList, title: 'Production Line List', canActivate: [authGuard]},
  { path: 'productionLine', component: ProductionLineDetails, title: 'Production Line Details', canActivate: [authGuard]},
  { path: 'blueprint', component: BlueprintDetails, title: 'Blueprint Details', canActivate: [authDashboardGuard]}

];
