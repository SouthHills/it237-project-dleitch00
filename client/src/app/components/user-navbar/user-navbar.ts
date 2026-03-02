import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-user-navbar',
  imports: [
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './user-navbar.html',
  styleUrl: './user-navbar.css',
  standalone: true
})
export class UserNavbar {

  deleteToken(): void
  {
    localStorage.removeItem('token');
    localStorage.removeItem('employee');
  }

}
