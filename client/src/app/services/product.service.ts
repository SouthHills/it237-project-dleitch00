import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductModel} from '../models/product.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.apiUrl + '/products';


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

  getProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.apiUrl, this.getAuthHeaders());
  }

  getProductById(productCode : number) : Observable<ProductModel> {


    return this.http.get<ProductModel>(`${this.apiUrl}/${productCode}`, this.getAuthHeaders())
  }

  addProduct(product: ProductModel): Observable<ProductModel> {
    return this.http.post<ProductModel>(this.apiUrl, product, this.getAuthHeaders())
  }

  updateProduct(product: ProductModel) : Observable<ProductModel>
  {
    const escapeProductCode = encodeURIComponent(product.productID);

    return this.http.put<ProductModel>(`${this.apiUrl}/${escapeProductCode}`, product, this.getAuthHeaders());
  }

    deleteProduct(productCode: number) : Observable<void>
  {
    const escapedProductCode = encodeURIComponent(productCode);

    return this.http.delete<void>(`${this.apiUrl}/${escapedProductCode}`, this.getAuthHeaders());
  }
}


