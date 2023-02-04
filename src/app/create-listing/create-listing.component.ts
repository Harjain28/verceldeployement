import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.scss']
})
export class CreateListingComponent implements OnInit {

  constructor() { }
  contactForm = new FormGroup({
    cars: new FormControl()
  })
  tagsForm = new FormGroup({
    car: new FormControl()
  })
  advertiseForm = new FormGroup({
    advertise: new FormControl()
  })
  
  accountForm = new FormGroup({
    exampleInputPassword1: new FormControl(),
    exampleInputPassword2: new FormControl(),
    exampleInputPassword3: new FormControl(),
    exampleInputPassword4: new FormControl(),
    exampleInputPassword5: new FormControl(),
    exampleInputPassword6: new FormControl(),
    exampleInputPassword7: new FormControl(),
    exampleInputPassword8: new FormControl(),
    exampleInputPassword9: new FormControl(),
    exampleInputPassword10: new FormControl(),
    exampleInputPassword11: new FormControl(),

  })
  deliveryTimeForm = new FormGroup({
    inlineRadioOptions1: new FormControl(),
  })
  time(){
    console.log(this. deliveryTimeForm.value)
  }
  onSubmit() {
    console.log(this.contactForm.value);
  }
  Next(){
    console.log(this. accountForm.value);
  }
  onSubmition() {
    console.log(this.tagsForm.value);
  }
  advert() {
    console.log(this.advertiseForm.value);
  }
  onSub(){
    console.log(this.deliveryTimeForm.value);
  }
  ngOnInit(): void {
  }

}
