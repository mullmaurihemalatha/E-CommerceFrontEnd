import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';
import { ProductService} from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productForm: FormGroup;
  loading = false;
  submitted = false;
  cats;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private alertService: AlertService,
              private productService: ProductService) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
        productName: ['', Validators.required],
        details: ['', Validators.required],
        price: ['', Validators.required],
        code: ['', Validators.required]
    });

            this.productService.getCats()
            .pipe(first())
            .subscribe(
                data => {
                  console.log(data);
                  this.cats=data;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
  }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.productForm.invalid) {
          return;
      }

      this.loading = true;
      // this.productService.addProduct(this.productForm.value)
      //     .pipe(first())
      //     .subscribe(
      //         data => {
      //             console.log("Hello")
      //             console.log(data);
      //             this.alertService.success('Registration successful', true);
      //             this.router.navigate(['/home']);
      //         },
      //         error => {
      //             this.alertService.error(error);
      //             this.loading = false;
      //         });
  }

}
