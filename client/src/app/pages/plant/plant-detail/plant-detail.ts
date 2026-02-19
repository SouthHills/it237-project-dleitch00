import {Component, effect, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Toast} from 'bootstrap';
import {PlantModel} from '../../../models/plant.model';
import {PlantService} from '../../../services/plant.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-plant-detail',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './plant-detail.html',
  styleUrl: './plant-detail.css',
})
export class PlantDetail {
  plant = signal<PlantModel | null>(null);
  modifiedPlant = signal<PlantModel>({} as PlantModel);

  errorMessage = signal<string>('');
  isNewPlant = signal<boolean>(false);

  // Toast State
  toastTitle = signal<string>('');
  toastMessage = signal<string>('');

  // Route parameter stored as a signal
  plantID = signal<string | null>(null);

  constructor(
    private route: ActivatedRoute,
    private plantService: PlantService,
    private router: Router
  )
  {                       // snapshot of the route when requesting the object
    this.plantID.set(this.route.snapshot.paramMap.get('id'));

    effect(() =>
    {
      const id = this.plantID();
      if (id === '-1')
      {
        this.isNewPlant.set(true);
        this.plant.set(null);
        this.modifiedPlant.set({} as PlantModel);
      }
      else
      {
        this.isNewPlant.set(false);

        this.plantService.getPlantById(Number(id)).subscribe({
          next: (data) => {
            this.plant.set(data);
            this.modifiedPlant.set({ ...data }); // cloning for editing

            this.errorMessage.set('');

          },
          error: (error) => {
            this.errorMessage.set('Error fetching the plant');
            console.error('There was an error!', error);
          }
        });
      }


    });
  }

  saveChanges(): void
  {
    const currentPlant = this.modifiedPlant();

    if (this.isNewPlant())
    {
      if (
        !currentPlant.plantID ||
        !currentPlant.plantName ||
        !currentPlant.plantNation ||
        !currentPlant.plantCity ||
        !currentPlant.plantStreet ||
        !currentPlant.plantZIP ||
        !currentPlant.plantStatus
      )
      {
        this.errorMessage.set('Values are required for all attributes except Vendor Code(V_CODE)');
        this.toastTitle.set('Error')
        this.toastMessage.set(this.errorMessage());
        this.showToast();
        return;
      }

      this.plantService.addPlant(currentPlant).subscribe({
        next: (newPlant) =>
        {
          this.toastTitle.set('Plant information');
          this.toastMessage.set('Plant created successfully.');
          this.showToast();

          setTimeout(() =>
          {
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
              this.router.navigate(['/plants', newPlant.plantID]));
          }, 2000);
        },
        error: (error) =>
        {
          console.error('Error creating plant: ', error);
          this.errorMessage.set('Error creating the plant.');
          this.toastTitle.set('Error');
          this.toastMessage.set(this.errorMessage());
          this.showToast();
        }
      });

      return;
    }

    // Update existing plant
    this.plantService.updatePlant(currentPlant).subscribe({
      next: (updatedPlant) =>
      {
        this.plant.set({...updatedPlant });
        this.modifiedPlant.set({ ...updatedPlant });
        this.toastTitle.set('Plant Information');
        this.toastMessage.set('Plant updated Successfully');
        this.showToast();
      },
      error: (error) =>
      {
        console.error('Error saving changes', error);
        this.errorMessage.set('Error updating the plant');
        this.toastTitle.set('Error');
        this.toastMessage.set('Error updating the plant');
        this.showToast();
      }
    });
  }

  deletePlant(): void
  {
    const currentPlant = this.plant();
    if(!currentPlant) return;

    const plantID = currentPlant.plantID;

    this.plantService.deletePlant(plantID).subscribe({
      next: () =>
      {
        this.toastTitle.set('Plant Information');
        this.toastMessage.set('Plant deleted successfully');
        this.showToast();

        setTimeout(() =>
        {
          this.router.navigate(['/plants']);
        }, 2000)
      },
      error: (error) =>
      {
        console.error('Error deleting plant', error);
        this.errorMessage.set('Error deleting the plant.')
        this.toastTitle.set('Error');
        this.toastMessage.set(
          this.errorMessage() + ' (Is it being referenced by another entity?)0'
        );
        this.showToast();
      }
    });
  }

  discardChanges(): void
  {
    const original = this.plant();
    if(!original) return;

    this.modifiedPlant.set({ ...original }); // creates a deep copy

    this.toastTitle.set('Plant Information');
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

