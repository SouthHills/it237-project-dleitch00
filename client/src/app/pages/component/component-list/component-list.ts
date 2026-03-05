import {Component, effect, signal} from '@angular/core';
import {Router} from '@angular/router';
import {ComponentModel} from '../../../models/component.model';
import {ComponentService} from '../../../services/component.service';
import {CurrencyPipe} from '@angular/common';
import {Spinner} from '../../../components/loading/spinner/spinner';

@Component({
  selector: 'app-component-list',
  imports: [
    CurrencyPipe,
    Spinner
  ],
  templateUrl: './component-list.html',
  styleUrl: './component-list.css',
  standalone: true
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
          if(error.error.redirectUrl)
          {
            this.router.navigate([error.error.redirectUrl]);
          }
          console.error('There was an error!', error);
        }
      });

    });
  }

  viewComponentDetails(componentID: number){
    this.router.navigate(['/components', componentID])
  }

  idSort = false;

  sortID()
  {
     if (this.idSort)
     {
      const sortedComponents = [...this.components()].sort((a, b) => b.componentID - a.componentID);
      this.components.set(sortedComponents);
      this.idSort = false;
      return;
     }
      const sortedComponents = [...this.components()].sort((a, b) => a.componentID - b.componentID);
      this.idSort = true;
      this.components.set(sortedComponents);
  }

  nameSort = false;

  sortName()
  {
    if (this.nameSort)
    {
      const sortedComponents = [...this.components()].sort((a, b) => b.componentName.localeCompare(a.componentName));
      this.components.set(sortedComponents);
      this.nameSort = false;
      return;
    }
    const sortedComponents = [...this.components()].sort((a, b) => a.componentName.localeCompare(b.componentName));
    this.nameSort = true;
    this.components.set(sortedComponents);
   }

   descriptionSort = false;

   sortDescription()
   {
     if (this.descriptionSort)
     {
       const sortedComponents = [...this.components()].sort((a, b) => b.componentDescription.localeCompare(a.componentDescription));
       this.components.set(sortedComponents);
       this.descriptionSort = false;
       return;
     }
     const sortedComponents = [...this.components()].sort((a, b) => a.componentDescription.localeCompare(b.componentDescription));
     this.descriptionSort = true;
     this.components.set(sortedComponents);
   }

   minimumStockSort = false;

   sortMinimumStock()
   {
     if (this.minimumStockSort)
     {
       const sortedComponents = [...this.components()].sort((a, b) => b.componentMinimumQuantity - a.componentMinimumQuantity);
       this.components.set(sortedComponents);
       this.minimumStockSort = false;
       return;
     }
     const sortedComponents = [...this.components()].sort((a, b) => a.componentMinimumQuantity - b.componentMinimumQuantity);
     this.minimumStockSort = true;
     this.components.set(sortedComponents);
   }

   priceSort = false;

   sortPrice()
   {
     if (this.priceSort)
     {
       const sortedComponents = [...this.components()].sort((a, b) => b.componentPrice - a.componentPrice);
       this.components.set(sortedComponents);
       this.priceSort = false;
       return;
     }
     const sortedComponents = [...this.components()].sort((a, b) => a.componentPrice - b.componentPrice);
     this.priceSort = true;
     this.components.set(sortedComponents);
   }

   vendorIDSort = false;

   sortVendorID()
   {
     if (this.vendorIDSort)
     {
       const sortedComponents = [...this.components()].sort((a, b) => b.vendorID - a.vendorID);
       this.components.set(sortedComponents);
       this.vendorIDSort = false;
       return;
     }
     const sortedComponents = [...this.components()].sort((a, b) => a.vendorID - b.vendorID);
     this.vendorIDSort = true;
     this.components.set(sortedComponents);
   }

}
