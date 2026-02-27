import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductionLineModel} from '../models/productionline.model';

@Injectable({
  providedIn: 'root',
})
export class ProductionLineService {
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
  getProductionLines(): Observable<ProductionLineModel[]>
  {
    return this.http.get<ProductionLineModel[]>(`${this.apiUrl}/productionLines`, this.getAuthHeaders());
  }

  getProductionLineById(productID: number, plantID: number) : Observable<ProductionLineModel>
  {
    const parameterString = `productID=${encodeURIComponent(productID)}&plantID=${encodeURIComponent(plantID)}`;

    return this.http.get<ProductionLineModel>(`${this.apiUrl}/productionLine?${parameterString}`, this.getAuthHeaders())
  }

  addProductionLine(productionLine: ProductionLineModel): Observable<ProductionLineModel> {
    return this.http.post<ProductionLineModel>(`${this.apiUrl}/productionLines`, productionLine, this.getAuthHeaders());
  }

  updateProductionLine(productionLine: ProductionLineModel) : Observable<ProductionLineModel>
  {
    const parameterString = `productID=${encodeURIComponent(productionLine.productID)}&plantID=${encodeURIComponent(productionLine.plantID)}`;

    return this.http.put<ProductionLineModel>(`${this.apiUrl}/productionLine?${parameterString}`, productionLine, this.getAuthHeaders());
  }

  deleteProductionLine(productID: number, plantID: number) : Observable<void>
  {
    const parameterString = `productID=${encodeURIComponent(productID)}&plantID=${encodeURIComponent(plantID)}`;

    return this.http.delete<void>(`${this.apiUrl}/productionLine?${parameterString}`, this.getAuthHeaders());
  }



}
