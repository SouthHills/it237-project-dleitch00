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
import {MyPlant} from './pages/plant/my-plant/my-plant';

export const routes: Routes = [
  { path: 'dashboard', redirectTo: '', pathMatch: "full"},
  { path: '', component: Dashboard, title: 'Dashboard'},
  { path: 'login', component: Login, title: 'Login'},
  { path: 'products', component: ProductList, title: 'Product List'},
  { path: 'products/:id', component: ProductDetail, title: 'Product Details'},
  { path: 'components', component: ComponentList, title: 'Component List'},
  { path: 'components/:id', component: ComponentDetail, title: 'Component Details'},
  { path: 'employees', component: EmployeeList, title: 'Employee List'},
  { path: 'employees/:id', component: EmployeeDetail, title: 'Employee Details'},
  { path: 'plants', component: PlantList, title: 'Plant List'},
  { path: 'plants/:id', component: PlantDetail, title: 'Plant Details'},
  { path: 'vendors', component: VendorList, title: 'Vendor List'},
  { path: 'vendors/:id', component: VendorDetail, title: 'Vendor Details'},
  { path: 'myplant', component: MyPlant, title: 'Plant Details'},

];
