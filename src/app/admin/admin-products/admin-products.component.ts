import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../../products.service';
import { Subscription } from 'rxjs/Subscription';
import { Products } from '../../models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Products[];
  subscription: Subscription;
  filteredProduct: any[];

  constructor(private productsService: ProductsService ) {
    this.subscription = this.productsService.getall().subscribe(p => this.filteredProduct = this.products = p);
   }

  ngOnInit() {
  }

  ngOnDestroy() {
  this.subscription.unsubscribe();
  }

  filter(query: string) {
    this.filteredProduct = (query) ?
    this.products.filter(q => q.title.toLowerCase().includes(query.toLowerCase()) ) : this.products;
  }

}
