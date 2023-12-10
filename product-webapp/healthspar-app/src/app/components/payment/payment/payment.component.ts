import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrderRequest, OrderResponse } from 'src/app/model/payment';
import { PaymentService } from 'src/app/service/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  //   form: any = {};
  // constructor(private http: HttpClient,
  //   private orderService: PaymentService) {

  // }

  // ngOnInit() {


  // }

  // sayHello() {
  //   alert("Hello DK");
  // }

  // paymentId: string | undefined;
  // error: string | undefined;

  // options = {
  //   "key": "",
  //   "amount": "",
  //   "name": "pavan kalyan",
  //   "description": "payment",
  //   "image": "data:image/png;base64,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",
  //   "order_id": "",
  //   "handler": function (response: any) {
  //     var event = new CustomEvent("payment.success",
  //       {
  //         detail: response,
  //         bubbles: true,
  //         cancelable: true
  //       }
  //     );
  //     window.dispatchEvent(event);
  //   }
  //   ,
  //   "prefill": {
  //     "name": "",
  //     "email": "",
  //     "contact": ""
  //   },
  //   "notes": {
  //     "address": ""
  //   },
  //   "theme": {
  //     "color": "#3399cc"
  //   }
  // };

  // onSubmit(): void {
  //   this.paymentId = '';
  //   this.error = '';
  //   this.orderService.createOrder(this.form).subscribe(
  //     data => {
  //       this.options.key = data.secretId;
  //       this.options.order_id = data['razorpayOrderId'];
  //       this.options.amount = data['applicationFee']; //paise
  //       this.options.prefill.name = "pavan kalyan";
  //       this.options.prefill.email = "pavankalyan@gmail.com";
  //       this.options.prefill.contact = "6303342375";

  //       if (data['pgName'] === 'razor2') {
  //         this.options.image = "";
  //         var rzp1 = new Razorpay(this.options);
  //         rzp1.open();
  //       } else {
  //         var rzp2 = new Razorpay(this.options);
  //         rzp2.open();
  //       }


  //       rzp1.on('payment.failed', function (response: { error: { code: any; description: any; source: any; step: any; reason: any; metadata: { order_id: any; payment_id: any; }; }; }) {
  //         // Todo - store this information in the server
  //         console.log(response);
  //         console.log(response.error.code);
  //         console.log(response.error.description);
  //         console.log(response.error.source);
  //         console.log(response.error.step);
  //         console.log(response.error.reason);
  //         console.log(response.error.metadata.order_id);
  //         console.log(response.error.metadata.payment_id);
  //         this.error = response.error.reason;
  //       }
  //       );
  //     }
  //     ,
  //     err => {
  //       this.error = err.error.message;
  //     }
  //   );
  // }

  // @HostListener('window:payment.success', ['$event'])
  // onPaymentSuccess(event): void {
  //   console.log(event.detail);
  // }
}