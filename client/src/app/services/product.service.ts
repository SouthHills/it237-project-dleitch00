import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductModel} from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';


  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.apiUrl);
  }

  getProductById(productCode : number) : Observable<ProductModel> {


    return this.http.get<ProductModel>(`${this.apiUrl}/${productCode}`)
  }

  addProduct(product: ProductModel): Observable<ProductModel> {
    return this.http.post<ProductModel>(this.apiUrl, product)
  }

  updateProduct(product: ProductModel) : Observable<ProductModel>
  {
    const escapeProductCode = encodeURIComponent(product.productID);

    return this.http.put<ProductModel>(`${this.apiUrl}/${escapeProductCode}`, product);
  }

    deleteProduct(productCode: number) : Observable<void>
  {
    const escapedProductCode = encodeURIComponent(productCode);

    return this.http.delete<void>(`${this.apiUrl}/${escapedProductCode}`);
  }
}


