import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service'
import { ProductService } from './services/product.service';
import { UserService } from './services/user.service';
import { User } from './models/user';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.css']
 })
export class AppComponent implements OnInit {
    currentUser: User;
    isLoggedIn: boolean = false;
    products;
    q;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private productService: ProductService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnInit(){
        console.log(this.currentUser);
        if (this.currentUser) {
          this.isLoggedIn = true
        }
    }
    searched(){
      this.productService.getSearch({q:this.q})
          .pipe(first())
          .subscribe(
              data => {
                console.log(data)
                this.products=data;
              },
              error => {
                  console.log("error")
              });
    }


    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
    clicked= function () {
        console.log("hello");
        this.router.navigateByUrl('/register');
    };
    login= function () {
        console.log("hello");
        this.router.navigateByUrl('/login');
    };
}
