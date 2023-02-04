import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contact: any;
  contacts: any;
  instagramLink: any;
  faceBookLink: any;
  isSubmit: boolean = false;
  contactForm: FormGroup = new FormGroup({});
  phoneDetails: any;
  iso2: any;
  errorPhone: boolean = true;

  constructor(private router: Router, private api: ApiService, private location: Location) {
    this.router.getCurrentNavigation().extras.state;

  }

  ngOnInit(): void {
    this.formInit();
    this.getStaticPageInfo();
  }

  formInit() {
    this.contactForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      email: new FormControl("", {
        validators: [
          Validators.required,
          Validators.pattern(
            "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-z]{2,4}$"
          ),
        ],
        updateOn: "blur",
      }),
      phone: new FormControl("", [
        Validators.required,
      ]),
      message: new FormControl("", [
        Validators.required,
      ]),
      
      reCaptcha: new FormControl(null, Validators.required),
    });
  }

  getStaticPageInfo() {
    this.api.get('staticpageinfosection').subscribe((res: any) => {
      this.contacts = res.sectionData[5];
      this.faceBookLink = res.sectionData[11];
      this.instagramLink = res.sectionData[13];
      this.contact = this.contacts;
    });
  }

  sendToSupport() {
    this.isSubmit = true;
    const formValue = this.contactForm.value;
    const requestData = {};
    requestData["name"] = formValue.name;
    requestData["email"] = formValue.email;
    requestData["message"] = formValue.message;
    if (this.phoneDetails) {
      requestData["mobileNo"] = this.phoneDetails + formValue.phone;
    } else {
      requestData["mobileNo"] = parseInt("+65" + formValue.phone);
    }
    if (this.contactForm.valid) {
      this.api.post('createcontactus', requestData).subscribe((res: any) => {
        if (res.status = true) {
          this.isSubmit = false;
          this.api.alert(res.message, 'success');
          this.router.navigate(["/view/contact-successfully"]);
        } else {
          this.isSubmit = false;
          this.api.alert(res.message, 'error');
        }
      });
    } else {
      this.contactForm.markAllAsTouched();
      this.isSubmit = false;
    }
  }

  numberOnly(event, type: string): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    const isOnlyNumber = charCode > 31 && (charCode < 48 || charCode > 57);
    const isFlotedNumber =
      charCode > 31 && (charCode < 46 || charCode > 57 || charCode === 47);
    if (type !== "mobile") {
      if (isOnlyNumber) {
        return false;
      }
      return true;
    } else {
      if (isFlotedNumber) {
        return false;
      }
      return true;
    }
  }

  getNumber(event) {
    // //console.log(event);
  }

  onCountryChange(event) {
    this.phoneDetails = event?.dialCode;
    this.iso2 = event?.iso2;
  }

  telInputObject(obj) {
    obj.setCountry('sg');
  }
  hasError(event) {
    this.errorPhone = event;
  }

  back() {
    this.location.back();
  }
}
