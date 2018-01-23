import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ProductsService {
  phoneUsers$ = 'phoneUsers';
  constructor(private db: AngularFireDatabase) { }


  save(products) {
    this.db.list('/products').push(products);
  }

  savePhoneDetails(userData) {
    this.db.list('/' + this.phoneUsers$ ).push(userData);
  }

  getall() {
    return this.db.list('products');
  }

  getProduct(productId) {
    // tslint:disable-next-line:quotemark
    return this.db.object("/products/" + productId);

  }

  updateData(productId, product) {
    // tslint:disable-next-line:quotemark
    return this.db.object("/products/" + productId).update(product);

  }

  removeProduct(productId) {
    // tslint:disable-next-line:quotemark
    return this.db.object("/products/" + productId).remove();
  }

}
