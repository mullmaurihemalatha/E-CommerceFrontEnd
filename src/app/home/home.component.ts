import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];
    products;
    q;

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private projectService: ProductService,
        private router: Router
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
        this.projectService.getAll()
            .pipe(first())
            .subscribe(
                data => {
                  this.products=data;
                },
                error => {
                    console.log("error")
                });

    }

    addtoCart(product){
      console.log("OK ");
       this.projectService.addtoCart(product)
       .pipe(first())
       .subscribe(
           data => {
             console.log(data)

           },
           error => {
               console.log("error")
           });
    }


    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }
}
