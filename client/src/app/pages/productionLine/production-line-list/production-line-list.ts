import {Component, effect, signal} from '@angular/core';
import {ProductionLineModel} from '../../../models/productionline.model';
import {ProductionLineService} from '../../../services/productionline.service';
import {Router} from '@angular/router';
import {Spinner} from '../../../components/loading/spinner/spinner';


@Component({
  selector: 'app-production-line-list',
  imports: [ Spinner ],
  templateUrl: './production-line-list.html',
  styleUrl: './production-line-list.css',
  standalone: true
})
export class ProductionLineList
{
  productionLines = signal<ProductionLineModel[]>([]);
  errorMessage = signal<string>('');

  constructor(private productionLineService: ProductionLineService, private router: Router)
  {
    effect(() =>
    {

      this.productionLineService.getProductionLines().subscribe({
        next: (data) => this.productionLines.set(data),
        error: (error) =>
        {
          this.errorMessage.set('Error fetching production lines.');
          console.error('There was an error!', error);
        }
      });
    });
  }

  viewProductionLineDetails(productID: number, plantID: number)
  {
    // Navigate to the registration detail page with query parameters for dogID and eventID
    this.router.navigate(['/productionLine'], {queryParams: {productID, plantID}});
  }

  plantIDSort = false;

  sortPlantID()
  {
    if (this.plantIDSort)
    {
      const sortedProductionLines = [...this.productionLines()].sort((a, b) => b.plantID - a.plantID);
      this.productionLines.set(sortedProductionLines);
      this.plantIDSort = false;
      return;
    }
    const sortedProductionLines = [...this.productionLines()].sort((a, b) => a.plantID - b.plantID);
    this.plantIDSort = true;
    this.productionLines.set(sortedProductionLines);
  }

  productIDSort = false;

  sortProductID()
  {
    if (this.productIDSort)
    {
      const sortedProductionLines = [...this.productionLines()].sort((a, b) => b.productID - a.productID);
      this.productionLines.set(sortedProductionLines);
      this.productIDSort = false;
      return;
    }
    const sortedProductionLines = [...this.productionLines()].sort((a, b) => a.productID - b.productID);
    this.productIDSort = true;
    this.productionLines.set(sortedProductionLines);
  }

  minimumSort = false;

  sortMinimum()
  {
    if (this.minimumSort)
    {
      const sortedProductionLines = [...this.productionLines()].sort((a, b) => b.productMinimum - a.productMinimum);
      this.productionLines.set(sortedProductionLines);
      this.minimumSort = false;
      return;
    }
    const sortedProductionLines = [...this.productionLines()].sort((a, b) => a.productMinimum - b.productMinimum);
    this.minimumSort = true;
    this.productionLines.set(sortedProductionLines);
  }

  quantitySort = false;

  sortQuantity()
  {
    if (this.quantitySort)
    {
      const sortedProductionLines = [...this.productionLines()].sort((a, b) => b.productQuantity - a.productQuantity);
      this.productionLines.set(sortedProductionLines);
      this.quantitySort = false;
      return;
    }
    const sortedProductionLines = [...this.productionLines()].sort((a, b) => a.productQuantity - b.productQuantity);
    this.quantitySort = true;
    this.productionLines.set(sortedProductionLines);
  }

}
