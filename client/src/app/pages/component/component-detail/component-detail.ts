import {Component, effect, signal} from '@angular/core';

import {ActivatedRoute, Router, RouterLink} from '@angular/router';

import {Toast} from 'bootstrap';
import {ComponentModel} from '../../../models/component.model';
import {ComponentService} from '../../../services/component.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-component-detail',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './component-detail.html',
  styleUrl: './component-detail.css',
})
export class ComponentDetail {
  component = signal<ComponentModel | null>(null);
  modifiedComponent = signal<ComponentModel>({} as ComponentModel);

  errorMessage = signal<string>('');
  isNewComponent = signal<boolean>(false);

  // Toast State
  toastTitle = signal<string>('');
  toastMessage = signal<string>('');

  // Route parameter stored as a signal
  componentID = signal<string | null>(null);

  constructor(
    private route: ActivatedRoute,
    private componentService: ComponentService,
    private router: Router
  )
  {                       // snapshot of the route when requesting the object
    this.componentID.set(this.route.snapshot.paramMap.get('id'));

    effect(() =>
    {
      const id = this.componentID();
      if (id === '-1')
      {
        this.isNewComponent.set(true);
        this.component.set(null);
        this.modifiedComponent.set({} as ComponentModel);
      }
      else
      {
        this.isNewComponent.set(false);

        this.componentService.getComponentById(Number(id)).subscribe({
          next: (data) => {
            this.component.set(data);
            this.modifiedComponent.set({ ...data }); // cloning for editing

            this.errorMessage.set('');

          },
          error: (error) => {
            this.errorMessage.set('Error fetching the component');
            if(error.error.redirectUrl)
            {
              this.router.navigate([error.error.redirectUrl]);
            }
            console.error('There was an error!', error);
          }
        });
      }


    });
  }

  saveChanges(): void
  {
    const currentComponent = this.modifiedComponent();

    if (this.isNewComponent())
    {
      if (
        !currentComponent.componentID ||
        !currentComponent.componentDescription ||
        currentComponent.componentPrice === undefined ||
        currentComponent.componentPrice === null ||
        !currentComponent.componentName ||
        !currentComponent.componentMinimumQuantity ||
        !currentComponent.vendorID
      )
      {
        this.errorMessage.set('Values are required for all attributes');
        this.toastTitle.set('Error')
        this.toastMessage.set(this.errorMessage());
        this.showToast();
        return;
      }

      this.componentService.addComponent(currentComponent).subscribe({
        next: (newComponent) =>
        {
          this.toastTitle.set('Component information');
          this.toastMessage.set('Component created successfully.');
          this.showToast();

          setTimeout(() =>
          {
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
              this.router.navigate(['/components', newComponent.componentID]));
          }, 2000);
        },
        error: (error) =>
        {
          console.error('Error creating component: ', error);
          this.errorMessage.set('Error creating the component.');
          this.toastTitle.set('Error');
          this.toastMessage.set(this.errorMessage());
          this.showToast();
        }
      });

      return;
    }

    // Update existing component
    this.componentService.updateComponent(currentComponent).subscribe({
      next: (updatedComponent) =>
      {
        this.component.set({...updatedComponent });
        this.modifiedComponent.set({ ...updatedComponent });
        this.toastTitle.set('Component Information');
        this.toastMessage.set('Component updated Successfully');
        this.showToast();
      },
      error: (error) =>
      {
        console.error('Error saving changes', error);
        this.errorMessage.set('Error updating the component');
        this.toastTitle.set('Error');
        this.toastMessage.set('Error updating the component');
        this.showToast();
      }
    });
  }

  deleteComponent(): void
  {
    const currentComponent = this.component();
    if(!currentComponent) return;

    const componentID = currentComponent.componentID;

    this.componentService.deleteComponent(componentID).subscribe({
      next: () =>
      {
        this.toastTitle.set('Component Information');
        this.toastMessage.set('Component deleted successfully');
        this.showToast();

        setTimeout(() =>
        {
          this.router.navigate(['/components']);
        }, 2000)
      },
      error: (error) =>
      {
        console.error('Error deleting component', error);
        this.errorMessage.set('Error deleting the component.')
        this.toastTitle.set('Error');
        this.toastMessage.set(
          this.errorMessage() + ' (Is it being referenced by another entity?)'
        );
        this.showToast();
      }
    });
  }

  discardChanges(): void
  {
    const original = this.component();
    if(!original) return;

    this.modifiedComponent.set({ ...original }); // creates a deep copy

    this.toastTitle.set('Component Information');
    this.toastMessage.set('Changes discarded');
    this.showToast();
  }

  private showToast(): void
  {
    const toast = document.getElementById('toast');

    if (toast)
    {
      const toastBootstrap = Toast.getOrCreateInstance(toast);
      toastBootstrap.show();
    }
  }

}

