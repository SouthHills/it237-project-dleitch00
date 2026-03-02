import {Component, OnInit, signal} from '@angular/core';

@Component({
  selector: 'app-spinner',
  imports: [],
  templateUrl: './spinner.html',
  standalone: true,
  styleUrl: './spinner.css'
})
export class Spinner implements OnInit{
  isLoading = signal(true);

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading.set(false)
    }, 500); // Change this duration as needed
  }


}
