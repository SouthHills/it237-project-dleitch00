import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PlantModel} from '../models/plant.model';

@Injectable({
  providedIn: 'root',
})
export class PlantService {

  private apiUrl = 'http://localhost:3000/plants';


  constructor(private http: HttpClient) {}

  getPlants(): Observable<PlantModel[]>
  {
    return this.http.get<PlantModel[]>(this.apiUrl);
  }

  getPlantById(plantID: number) : Observable<PlantModel> {
    const escapedPlantID = encodeURIComponent(plantID);

    return this.http.get<PlantModel>(`${this.apiUrl}/${escapedPlantID}`)
  }

  addPlant(plant: PlantModel): Observable<PlantModel> {
    return this.http.post<PlantModel>(this.apiUrl, plant)
  }

  updatePlant(plant: PlantModel) : Observable<PlantModel>
  {
    const escapedPlantID = encodeURIComponent(plant.plantID);

    return this.http.put<PlantModel>(`${this.apiUrl}/${escapedPlantID}`, plant);
  }

  deletePlant(plantID: number) : Observable<void>
  {
    const escapedPlantID = encodeURIComponent(plantID);

    return this.http.delete<void>(`${this.apiUrl}/${escapedPlantID}`);
  }



}
