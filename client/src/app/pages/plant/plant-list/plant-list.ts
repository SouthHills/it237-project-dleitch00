import {Component, effect, signal} from '@angular/core';
import {Router} from '@angular/router';
import {PlantModel} from '../../../models/plant.model';
import {PlantService} from '../../../services/plant.service';
import {CurrencyPipe} from '@angular/common';



@Component({
  selector: 'app-plant-list',
  imports: [
    CurrencyPipe
  ],
  templateUrl: './plant-list.html',
  styleUrl: './plant-list.css',
})
export class PlantList {
  plants = signal<PlantModel[]>([]);
  errorMessage = signal<string>('');

  constructor(private plantService: PlantService, private router: Router)
  {
    //reactive function, runs when created, reruns when any signals inside of the effect change
    effect(() =>
    {
      //benefits of subscribing to an observable is that when it changes it will automatically be called
      this.plantService.getPlants().subscribe({
        next: (data ) => this.plants.set(data),
        error: (error) => {
          this.errorMessage.set('Error fetching plants.');
          console.error('There was an error!', error);
        }
      });

    });
  }

  viewPlantDetails(plantID: number){
    this.router.navigate(['/plants', plantID])
  }

}




