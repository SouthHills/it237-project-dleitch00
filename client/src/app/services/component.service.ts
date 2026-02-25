import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ComponentModel} from '../models/component.model';

@Injectable({
  providedIn: 'root',
})
export class ComponentService {
  private apiUrl = 'http://localhost:3000/components';

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

  getComponents(): Observable<ComponentModel[]> {
    return this.http.get<ComponentModel[]>(this.apiUrl);
  }

  getComponentById(componentID: number) : Observable<ComponentModel> {
    const escapedComponentID = encodeURIComponent(componentID);

    return this.http.get<ComponentModel>(`${this.apiUrl}/${escapedComponentID}`)
  }

  addComponent(component: ComponentModel): Observable<ComponentModel> {
    return this.http.post<ComponentModel>(this.apiUrl, component)
  }

  updateComponent(component: ComponentModel) : Observable<ComponentModel>
  {
    const escapedComponentID = encodeURIComponent(component.componentID);

    return this.http.put<ComponentModel>(`${this.apiUrl}/${escapedComponentID}`, component);
  }

  deleteComponent(componentID: number) : Observable<void>
  {
    const escapedComponentID = encodeURIComponent(componentID);

    return this.http.delete<void>(`${this.apiUrl}/${escapedComponentID}`);
  }
}


