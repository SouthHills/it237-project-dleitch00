import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {VendorModel} from '../models/vendor.model';

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  private apiUrl = 'http://localhost:3000/vendors';


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

  getVendors(): Observable<VendorModel[]> {
    return this.http.get<VendorModel[]>(this.apiUrl, this.getAuthHeaders());
  }

  getVendorById(vendorID: number) : Observable<VendorModel> {
    const escapedVendorID = encodeURIComponent(vendorID);

    return this.http.get<VendorModel>(`${this.apiUrl}/${escapedVendorID}`, this.getAuthHeaders())
  }

  addVendor(vendor: VendorModel): Observable<VendorModel> {
    return this.http.post<VendorModel>(this.apiUrl, vendor, this.getAuthHeaders())
  }

  updateVendor(vendor: VendorModel) : Observable<VendorModel>
  {
    const escapedVendorID = encodeURIComponent(vendor.vendorID);

    return this.http.put<VendorModel>(`${this.apiUrl}/${escapedVendorID}`, vendor, this.getAuthHeaders());
  }

  deleteVendor(vendorID: number) : Observable<void>
  {
    const escapedVendorID = encodeURIComponent(vendorID);

    return this.http.delete<void>(`${this.apiUrl}/${escapedVendorID}`, this.getAuthHeaders());
  }



}
