import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { ProductsService } from '../../products.service';
import {  Router } from '@angular/router';
import 'rxjs/add/operator/take';
import { Products } from '../../models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
categories$;
id;
product = {
    category : '',
    imageUrl : '',
    title: '',
    price: ''
};
  constructor(private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productsService: ProductsService) {

    this.categories$ = categoryService.getCategories();
    // tslint:disable-next-line:prefer-const
     this.id = this.route.snapshot.paramMap.get('id');
    // tslint:disable-next-line:curly
    // tslint:disable-next-line:no-unused-expression
    // tslint:disable-next-line:curly
    if (this.id) this.productsService.getProduct(this.id).take(1).subscribe(p => this.product = p);
   }

  ngOnInit() {
  }

  save(product) {
    // tslint:disable-next-line:whitespace
    // tslint:disable-next-line:curly
    if (this.id) this.productsService.updateData(this.id, product);
    // tslint:disable-next-line:curly
    else this.productsService.save(product);
    this.router.navigate(['/admin/products']);
    alert('Data saved Sucessfully');
  }

  delete() {
    // tslint:disable-next-line:whitespace
    // tslint:disable-next-line:curly
    if ( !confirm('Are you sure you want to delete') ) return;
    this.productsService.removeProduct(this.id);
    this.router.navigate(['/admin/products']);

  }
}
