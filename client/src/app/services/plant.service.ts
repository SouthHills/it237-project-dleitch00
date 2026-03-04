import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PlantModel} from '../models/plant.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  private apiUrl = environment.apiUrl + '/plants';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): { headers?: HttpHeaders }
  {
    const token = localStorage.getItem('token');
    if (!token)
    {
      return {};
    }

    return {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    };
  }

  getPlants(): Observable<PlantModel[]>
  {
    return this.http.get<PlantModel[]>(this.apiUrl, this.getAuthHeaders());
  }

  getPlantById(plantID: number) : Observable<PlantModel> {
    const escapedPlantID = encodeURIComponent(plantID);

    return this.http.get<PlantModel>(`${this.apiUrl}/${escapedPlantID}`, this.getAuthHeaders())
  }

  addPlant(plant: PlantModel): Observable<PlantModel> {
    return this.http.post<PlantModel>(this.apiUrl, plant, this.getAuthHeaders())
  }

  updatePlant(plant: PlantModel) : Observable<PlantModel>
  {
    const escapedPlantID = encodeURIComponent(plant.plantID);

    return this.http.put<PlantModel>(`${this.apiUrl}/${escapedPlantID}`, plant, this.getAuthHeaders());
  }

  deletePlant(plantID: number) : Observable<void>
  {
    const escapedPlantID = encodeURIComponent(plantID);

    return this.http.delete<void>(`${this.apiUrl}/${escapedPlantID}`, this.getAuthHeaders());
  }
}
