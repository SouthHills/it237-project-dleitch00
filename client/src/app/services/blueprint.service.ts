import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BlueprintModel} from '../models/blueprint.model';

@Injectable({
  providedIn: 'root',
})
export class BlueprintService {
  private apiUrl = 'http://localhost:3000';


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

  getBlueprint(): Observable<BlueprintModel[]> {
    return this.http.get<BlueprintModel[]>(`${this.apiUrl}/blueprints`, this.getAuthHeaders());
  }

  getBlueprintById(productID : string, componentID: string) : Observable<BlueprintModel> {
    const parameterString = `productID=${encodeURIComponent(productID)}&componentID=${encodeURIComponent(componentID)}`;

    return this.http.get<BlueprintModel>(`${this.apiUrl}/blueprint?${parameterString}`, this.getAuthHeaders())
  }

  addBlueprint(blueprint: BlueprintModel): Observable<BlueprintModel> {
    return this.http.post<BlueprintModel>(`${this.apiUrl}/blueprints`, blueprint, this.getAuthHeaders());
  }

  updateBlueprint(blueprint: BlueprintModel) : Observable<BlueprintModel>
  {
    const parameterString = `productID=${encodeURIComponent(blueprint.productID)}&componentID=${encodeURIComponent(blueprint.componentID)}`;

    return this.http.put<BlueprintModel>(`${this.apiUrl}/blueprint?${parameterString}`, blueprint, this.getAuthHeaders());
  }

  deleteBlueprint(productID: string, componentID : string) : Observable<void>
  {
    const parameterString = `productID=${encodeURIComponent(productID)}&componentID=${encodeURIComponent(componentID)}`;

    return this.http.delete<void>(`${this.apiUrl}/blueprint?${parameterString}`, this.getAuthHeaders());
  }
}


