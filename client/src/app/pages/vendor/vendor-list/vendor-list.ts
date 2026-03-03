import {Component, effect, signal} from '@angular/core';
import {Router} from '@angular/router';
import {VendorModel} from '../../../models/vendor.model';
import {VendorService} from '../../../services/vendor.service';
import {Spinner} from '../../../components/loading/spinner/spinner';

@Component({
  selector: 'app-vendor-list',
  imports: [Spinner],
  templateUrl: './vendor-list.html',
  styleUrl: './vendor-list.css',
  standalone: true
})
export class VendorList {
  vendors = signal<VendorModel[]>([]);
  errorMessage = signal<string>('');

  constructor(private vendorService: VendorService, private router: Router)
  {
    //reactive function, runs when created, reruns when any signals inside of the effect change
    effect(() =>
    {
      //benefits of subscribing to an observable is that when it changes it will automatically be called
      this.vendorService.getVendors().subscribe({
        next: (data ) => this.vendors.set(data),
        error: (error) => {
          this.errorMessage.set('Error fetching vendors.');
          if(error.error.redirectUrl)
          {
            this.router.navigate([error.error.redirectUrl]);
          }
          console.error('There was an error!', error);
        }
      });

    });
  }

  viewVendorDetails(vendorID: number){
    this.router.navigate(['/vendors', vendorID])
  }

  idSort = false;

  sortID()
  {
     if (this.idSort)
     {
      const sortedVendors = [...this.vendors()].sort((a, b) => b.vendorID - a.vendorID);
      this.vendors.set(sortedVendors);
      this.idSort = false;
      return;
     }
       const sortedVendors = [...this.vendors()].sort((a, b) => a.vendorID - b.vendorID);
       this.idSort = true;
       this.vendors.set(sortedVendors);
  }

  nameSort = false;

  sortName()
  {
    if (this.nameSort)
    {
      const sortedVendors = [...this.vendors()].sort((a, b) => b.vendorName.localeCompare(a.vendorName));
      this.vendors.set(sortedVendors);
      this.nameSort = false;
      return;
    }
    const sortedVendors = [...this.vendors()].sort((a, b) => a.vendorName.localeCompare(b.vendorName));
    this.nameSort = true;
    this.vendors.set(sortedVendors);
   }

   specializationSort = false;

   sortSpecialization()
   {
     if (this.specializationSort)
     {
       const sortedVendors = [...this.vendors()].sort((a, b) => b.vendorSpecialization.localeCompare(a.vendorSpecialization));
       this.vendors.set(sortedVendors);
       this.specializationSort = false;
       return;
     }
     const sortedVendors = [...this.vendors()].sort((a, b) => a.vendorSpecialization.localeCompare(b.vendorSpecialization));
     this.specializationSort = true;
     this.vendors.set(sortedVendors);
   }

   nationSort = false;

   sortNation()
   {
     if (this.nationSort)
     {
       const sortedVendors = [...this.vendors()].sort((a, b) => b.vendorHqNation.localeCompare(a.vendorHqNation));
       this.vendors.set(sortedVendors);
       this.nationSort = false;
       return;
     }
     const sortedVendors = [...this.vendors()].sort((a, b) => a.vendorHqNation.localeCompare(b.vendorHqNation));
     this.nationSort = true;
     this.vendors.set(sortedVendors);
   }

   citySort = false;
   sortCity()
   {
     if (this.citySort)
     {
       const sortedVendors = [...this.vendors()].sort((a, b) => b.vendorHqCity.localeCompare(a.vendorHqCity));
       this.vendors.set(sortedVendors);
       this.citySort = false;
       return;
     }
      const sortedVendors = [...this.vendors()].sort((a, b) => a.vendorHqCity.localeCompare(b.vendorHqCity));
      this.citySort = true;
      this.vendors.set(sortedVendors);
   }

   streetSort = false;
   sortStreet()
   {
     if (this.streetSort)
     {
       const sortedVendors = [...this.vendors()].sort((a, b) => b.vendorHqStreet.localeCompare(a.vendorHqStreet));
       this.vendors.set(sortedVendors);
       this.streetSort = false;
       return;
     }
      const sortedVendors = [...this.vendors()].sort((a, b) => a.vendorHqStreet.localeCompare(b.vendorHqStreet));
      this.streetSort = true;
      this.vendors.set(sortedVendors);
   }

   zipSort = false;
   sortZip()
   {
     if (this.zipSort)
     {
       const sortedVendors = [...this.vendors()].sort((a, b) => b.vendorHqZIP.localeCompare(a.vendorHqZIP));
       this.vendors.set(sortedVendors);
       this.zipSort = false;
       return;
     }
      const sortedVendors = [...this.vendors()].sort((a, b) => a.vendorHqZIP.localeCompare(b.vendorHqZIP));
      this.zipSort = true;
      this.vendors.set(sortedVendors);
   }



}

