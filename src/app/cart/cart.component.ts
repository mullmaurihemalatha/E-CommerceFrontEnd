import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product'
import { Item } from '../models/item'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    private items: Item[];
  	private total: number = 0;
    private cartItems;
    private sumTotal: number = 0;

  	constructor(
  		private activatedRoute: ActivatedRoute,
  		private productService: ProductService
  	) { }

  	ngOnInit() {
      console.log("Helo");
      this.productService.getCart()
      .pipe(first())
      .subscribe(
         data => {
           this.cartItems=data;
           for (var i = 0; i < this.cartItems.length; i++) {
        			this.total= (this.cartItems[i].product.price) * (this.cartItems[i].quantity);
              this.cartItems[i].product.price = this.total;
              this.sumTotal += this.total;
          }
         },
         error => {
             console.log("error")
         });
    }
    removeItem(){
      
    }



}
