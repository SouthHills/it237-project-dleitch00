import {Component, effect, signal} from '@angular/core';
import {ProductModel} from '../../../models/product.model';
import {ProductService} from '../../../services/product.service';
import {Router} from '@angular/router';
import {ComponentModel} from '../../../models/component.model';
import {ComponentService} from '../../../services/component.service';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-component-list',
  imports: [
    CurrencyPipe
  ],
  templateUrl: './component-list.html',
  styleUrl: './component-list.css',
})
export class ComponentList {
  components = signal<ComponentModel[]>([]);
  errorMessage = signal<string>('');

  constructor(private componentService: ComponentService, private router: Router)
  {
    //reactive function, runs when created, reruns when any signals inside of the effect change
    effect(() =>
    {
      //benefits of subscribing to an observable is that when it changes it will automatically be called
      this.componentService.getComponents().subscribe({
        next: (data ) => this.components.set(data),
        error: (error) => {
          this.errorMessage.set('Error fetching components.');
          console.error('There was an error!', error);
        }
      });

    });
  }

  viewComponentDetails(componentID: number){
    this.router.navigate(['/components', componentID])
  }

}
