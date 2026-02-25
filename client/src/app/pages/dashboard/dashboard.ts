import {Component, effect, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlantModel} from '../../models/plant.model';
import {PlantService} from '../../services/plant.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  plants = signal<PlantModel[]>([]);

  constructor(private plantService: PlantService, private router: Router)
  {
    //reactive function, runs when created, reruns when any signals inside of the effect change
    effect(() =>
    {
      //benefits of subscribing to an observable is that when it changes it will automatically be called
      this.plantService.getPlants().subscribe({
        next: (data ) => this.plants.set(data),
        error: (error) => {
          console.error('There was an error!', error);
        }
      });

    });
  }



}
