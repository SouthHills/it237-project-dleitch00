import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BlueprintModel} from '../models/blueprint.model';

@Injectable({
  providedIn: 'root',
})
class BlueprintService {
  private apiUrl = 'http://localhost:3000/blueprints';


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
    return this.http.get<BlueprintModel[]>(this.apiUrl);

  }

  getBlueprintById(productID : string, componentID: string) : Observable<BlueprintModel> {
    const escapedProductID = encodeURIComponent(productID);
    const escapedcomponentID = encodeURIComponent(componentID);

    return this.http.get<BlueprintModel>(`${this.apiUrl}/${escapedProductID}&${escapedcomponentID}`)

  }

  addBlueprint(blueprint: BlueprintModel): Observable<BlueprintModel> {
    return this.http.post<BlueprintModel>(this.apiUrl, blueprint);

  }

  updateBlueprint(blueprint: BlueprintModel) : Observable<BlueprintModel>
  {
    const escapedProductID = encodeURIComponent(blueprint.productID);
    const escapedcomponentID = encodeURIComponent(blueprint.componentID);

    return this.http.put<BlueprintModel>(`${this.apiUrl}/${escapedProductID}/${escapedcomponentID}`, blueprint);

  }

  deleteBlueprint(productID: string, componentID : string) : Observable<void>
  {
    const escapedProductID = encodeURIComponent(productID);
    const escapedcomponentID = encodeURIComponent(componentID);


    return this.http.delete<void>(`${this.apiUrl}/${escapedProductID}`);

  }
}


