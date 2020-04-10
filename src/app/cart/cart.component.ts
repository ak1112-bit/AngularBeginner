import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items;
  // checkoutForm;
  editForm: FormGroup;

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private formModule: FormsModule,
    // private formGroup: FormGroup,
  ) {
    // this.checkoutForm = this.formBuilder.group({
    //   name: '',
    //   address: ['', [Validators.email]],
    // });
   }

  ngOnInit() {
    this.items = this.cartService.getItems();
    this.editForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.email]],
    });
  }

  onSubmit(customerData) {
    this.items = this.cartService.clearCart();
    this.editForm.reset();

    console.warn('注文が完了しました', customerData);
  }
  // getErrorMessage() {
  //   if (this.checkoutForm.address.hasError('required')) {
  //     return 'メールアドレスを入力してください';
  //   }

  //   return this.checkoutForm.address.hasError('address') ? 'Not a valid email' : '';
  // }
  get name(): AbstractControl {
    return this.editForm.get('name');
  }
  get address(): AbstractControl {
    return this.editForm.get('address');
  }
}
