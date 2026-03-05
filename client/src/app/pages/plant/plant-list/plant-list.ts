import {Component, effect, signal} from '@angular/core';
import {Router} from '@angular/router';
import {PlantModel} from '../../../models/plant.model';
import {PlantService} from '../../../services/plant.service';
import {CurrencyPipe} from '@angular/common';
import {Spinner} from '../../../components/loading/spinner/spinner';



@Component({
  selector: 'app-plant-list',
  imports: [
    Spinner
  ],
  templateUrl: './plant-list.html',
  styleUrl: './plant-list.css',
  standalone: true
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
          if(error.error.redirectUrl)
          {
            this.router.navigate([error.error.redirectUrl]);
          }
        }
      });

    });
  }

  viewPlantDetails(plantID: number){
    this.router.navigate(['/plants', plantID])
  }

  idSort = false;

  sortID()
  {
     if (this.idSort)
     {
      const sortedPlants = [...this.plants()].sort((a, b) => b.plantID - a.plantID);
      this.plants.set(sortedPlants);
      this.idSort = false;
      return;
     }
      const sortedPlants = [...this.plants()].sort((a, b) => a.plantID - b.plantID);
      this.idSort = true;
      this.plants.set(sortedPlants);
  }

  nameSort = false;

  sortName()
  {

    if (this.nameSort)
    {
      const sortedPlants = [...this.plants()].sort((a, b) => b.plantName.localeCompare(a.plantName));
      this.plants.set(sortedPlants);
      this.nameSort = false;
      return;
    }
    const sortedPlants = [...this.plants()].sort((a, b) => a.plantName.localeCompare(b.plantName));
    this.nameSort = true;
    this.plants.set(sortedPlants);
  }

  nationSort = false;

  sortNation()
  {

    if (this.nationSort)
    {
      const sortedPlants = [...this.plants()].sort((a, b) => b.plantNation.localeCompare(a.plantNation));
      this.plants.set(sortedPlants);
      this.nationSort = false;
      return;
    }
    const sortedPlants = [...this.plants()].sort((a, b) => a.plantNation.localeCompare(b.plantNation));
    this.nationSort = true;
    this.plants.set(sortedPlants);
  }

  citySort = false;

  sortCity()
  {

    if (this.citySort)
    {
      const sortedPlants = [...this.plants()].sort((a, b) => b.plantCity.localeCompare(a.plantCity));
      this.plants.set(sortedPlants);
      this.citySort = false;
      return;
    }
    const sortedPlants = [...this.plants()].sort((a, b) => a.plantCity.localeCompare(b.plantCity));
    this.citySort = true;
    this.plants.set(sortedPlants);
  }

  streetSort = false;

  sortStreet()
  {

    if (this.streetSort)
    {
      const sortedPlants = [...this.plants()].sort((a, b) => b.plantStreet.localeCompare(a.plantStreet));
      this.plants.set(sortedPlants);
      this.streetSort = false;
      return;
    }
    const sortedPlants = [...this.plants()].sort((a, b) => a.plantStreet.localeCompare(b.plantStreet));
    this.streetSort = true;
    this.plants.set(sortedPlants);
  }

  zipSort = false;

  sortZip()
  {
    if (this.zipSort)
    {
      const sortedPlants = [...this.plants()].sort((a, b) => b.plantZIP.localeCompare(a.plantZIP));
      this.plants.set(sortedPlants);
      this.zipSort = false;
      return;
    }
    const sortedPlants = [...this.plants()].sort((a, b) => a.plantZIP.localeCompare(b.plantZIP));
    this.zipSort = true;
    this.plants.set(sortedPlants);
  }

  statusSort = false;

  sortStatus()
  {
    if (this.statusSort)
    {
      const sortedPlants = [...this.plants()].sort((a, b) => b.plantStatus.localeCompare(a.plantStatus));
      this.plants.set(sortedPlants);
      this.statusSort = false;
      return;
    }
    const sortedPlants = [...this.plants()].sort((a, b) => a.plantStatus.localeCompare(b.plantStatus));
    this.statusSort = true;
    this.plants.set(sortedPlants);
  }

}




