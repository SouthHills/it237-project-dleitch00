import { Routes } from '@angular/router';
import {Dashboard} from './dashboard/dashboard';
import {ProductList} from './product/product-list/product-list';
import {ProductDetail} from './product/product-detail/product-detail';
import {ComponentList} from './component/component-list/component-list';
import {ComponentDetail} from './component/component-detail/component-detail';
import {EmployeeList} from './employee/employee-list/employee-list';
import {EmployeeDetail} from './employee/employee-detail/employee-detail';
import {PlantDetail} from './plant/plant-detail/plant-detail';
import {PlantList} from './plant/plant-list/plant-list';
import {VendorList} from './vendor/vendor-list/vendor-list';
import {VendorDetail} from './vendor/vendor-detail/vendor-detail';
import {Login} from './login/login';
import {MyPlant} from './plant/my-plant/my-plant';

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
