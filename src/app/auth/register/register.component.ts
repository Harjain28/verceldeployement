import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators, ValidationErrors, ValidatorFn, AbstractControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { AuthService } from "src/app/services/auth.service";
import { EventService } from "src/app/services/event.service";
import { StorageService } from "src/app/services/storage.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  bform: FormGroup = new FormGroup({});
  pvisibility: boolean;
  pcvisibility: boolean;
  bpvisibility: boolean;
  bpcvisibility: boolean;
  phoneDetails: any;
  errorPhone: boolean = true;
  iso2: any;
  registerbool: boolean = false;
  types: any;
  IsSubmitBool: boolean = false;
  searchKey: any = '';
  suggestions: any = [];
  businessClaim: boolean = false;
  claimMessage: any = '';
  suggetionBool: boolean;
  formIsValid: boolean = false;
  bformIsValid: boolean = false;
  showClaimErr: boolean = false;

  constructor(
    public auth: AuthService,
    private storage: StorageService,
    private router: Router,
    private route: ActivatedRoute,
    private event: EventService,
    private api: ApiService
  ) {
    this.pvisibility = false;
    this.pcvisibility = false;
    this.bpvisibility = false;
    this.bpcvisibility = false;

    this.route.params.subscribe((params) => {
      this.types = params['type'];
    });
  }

  @ViewChild('tabs', { static: false }) tabs;
  selectedIndex: number;

  // isHidden: boolean = true;

  ngOnInit(): void {
    this.formInit();
    this.getInfoText();
  }

  public googleSignIn() {
    this.registerbool = true;
    this.auth.googleSignin();
  }

  public appleSignin() {
    this.auth.appleSignin();
  }

  public facebookSignin() {
    this.auth.facebookSignin();
  }

  onCountryChange(event) {
    this.phoneDetails = event?.dialCode;
    this.iso2 = event?.iso2;
  }

  telInputObject(obj) {
    obj.setCountry('sg');
  }

  hasError(event) {
    let phoneVal = this.form.controls.phone.value;
    if (phoneVal?.trim().length > 0) {
      this.errorPhone = event;
    } else {
      this.errorPhone = true;
    }
  }

  getNumber(event) {
    // //console.log(event);
  }

  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const valid = regex.test(control.value);
      return valid ? null : error;
    };
  }

  formInit() {
    this.searchKey = this.event.businessName;

    this.form = new FormGroup({
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
      phone: new FormControl(""),
      password: new FormControl("", Validators.compose([
        Validators.required,
        RegisterComponent.patternValidator(/\d/, { hasNumber: true }),
        RegisterComponent.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        RegisterComponent.patternValidator(/[a-z]/, { hasSmallCase: true }),
        RegisterComponent.patternValidator(/[!@#$%^&*{}()_"|,.<>?]/, { hasSpecialCharacters: true }),
        Validators.minLength(8),
      ])),
      confirm_password: new FormControl("", [Validators.required]),
      reCaptcha: new FormControl(null, Validators.required),
    });


    this.bform = new FormGroup({
      businessName: new FormControl(this.event.businessName, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      privacy: new FormControl("", [Validators.required]),
      name: new FormControl(this.event.businessPersonName, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
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
        Validators.pattern("[8-9]\\d{7}"),
      ]),
      password: new FormControl("", Validators.compose([
        Validators.required,
        RegisterComponent.patternValidator(/\d/, { hasNumber: true }),
        RegisterComponent.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        RegisterComponent.patternValidator(/[a-z]/, { hasSmallCase: true }),
        RegisterComponent.patternValidator(/[!@#$%^&*{}()_"|,.<>?]/, { hasSpecialCharacters: true }),
        Validators.minLength(8),
      ])),
      confirm_password: new FormControl("", Validators.required),
    });
    if (this.event.businessName.trim() !== '') {
      this.suggetionBool = false;
      this.bform.controls["businessName"].disable();
    } else {
      this.suggetionBool = true;
    }
  }
  
  validation() {
    this.formIsValid = this.form.controls.password.valid ? true : false;
    this.bformIsValid = this.bform.controls.password.valid ? true : false;
  }

  matchinputValue(parentControl: FormControl, childControl: FormControl) {
    if (parentControl.value !== childControl.value) {
      childControl.setErrors({ noMatch: true });
    } else {
      childControl.clearValidators();
      childControl.updateValueAndValidity();
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

  submitStudentForm() {
    this.IsSubmitBool = true;
    const formValue = this.form.value;
    let requestData = {};
    const lat = 0.00;
    const long = 0.00;
    requestData["name"] = formValue.name.trim();
    requestData["email"] = formValue.email.trim();
    requestData["password"] = formValue.password;
    requestData["lat"] = lat;
    requestData["long"] = long;
    if (this.iso2) {
      requestData["countryCode"] = this.iso2;
    } else {
      requestData["countryCode"] = 'sg';
    }
    if (this.phoneDetails) {
      requestData["mobileNo"] = (formValue?.phone?.length > 0) ? this.phoneDetails + formValue.phone : '';
    } else {
      requestData["mobileNo"] = (formValue?.phone?.length > 0) ? parseInt("+65" + formValue.phone) : '';
    }
    requestData["type"] = "student";
    if (this.form.valid) {
      if (this.errorPhone) {
        this.api.post("userregister", requestData).subscribe((res: any) => {
          if (res.status) {
            this.IsSubmitBool = false;
            this.api.alert(
              "you have sucessfully signed up in Klassbook",
              "success"
            );
            localStorage.clear();
            this.storage.setToken(res.token);
            this.storage.setData(res.data, res.classData);
            this.router.navigate([""]);
            setTimeout(() => {
              this.event.sendEditEvent;
            }, 100);
          } else {
            this.api.alert(res.message, "error");
            this.IsSubmitBool = false;
          }
        });
      } else {
        this.form.markAllAsTouched();
        this.IsSubmitBool = false;
        // this.api.alert('Please fill correct mobile number' , 'error')
      }
    } else {
      this.form.markAllAsTouched();
      this.IsSubmitBool = false;
    }
    if (this.event.businessName.trim() !== '') {
      this.suggetionBool = true;
    }
  }

  // siteType offsite and onsite values in userRegister api 
  // Have to add this functionality ;

  submitBusinessForm() {
    this.IsSubmitBool = true;
    const formValue = this.bform.value;
    const lat = 0.00;
    const long = 0.00;
    let requestData = {};

    if (this.event.businessPersonName && this.event.businessPersonName.trim() !== '') {
      requestData["businessName"] = this.event.businessPersonName;
    } else {
      requestData["name"] = formValue.name.trim();
    }

    if (this.event.businessName && this.event.businessName.trim() !== '') {
      requestData["businessName"] = this.event.businessName;
    } else {
      requestData["businessName"] = formValue.businessName;
    }

    requestData["email"] = formValue.email.trim();
    requestData["password"] = formValue.password;
    requestData["lat"] = lat;
    requestData["long"] = long;
    requestData["mobileNo"] = parseInt("+65" + formValue.phone);
    requestData["type"] = "business";
    requestData["businessClaim"] = this.businessClaim;
    if (this.bform.valid) {
      this.api.post("userregister", requestData).subscribe((res: any) => {
        // this.event.businessName = formValue.businessName.trim();
        if (res.status) {
          this.IsSubmitBool = false;
          this.api.alert(
            "you have successfuly signed up as a BUSINESS",
            "success"
          );
          if (this.event.businessName.trim() === '') {
            localStorage.clear();
            this.storage.setData(res.data, res.newClass);
            this.storage.businessToken = res.token;
          } else {
            this.storage.setData(res.data, this.storage.classData);
          }
          this.storage.setbranchStatus('editbranch');
          this.router.navigate(["/email-verify"]);
        } else {
          if (res.message === 'Please contact support for assistance as this email or business already exit') {
            this.showClaimErr = true;
            setTimeout(() => this.showClaimErr = false, 40000);
          }else{
            this.api.alert(res.message, "error");
          }
          this.IsSubmitBool = false;
        }
      });
    } else {
      this.bform.markAllAsTouched();
      this.IsSubmitBool = false;
    }
  }

  getBusinessNames() {
    if (this.event.businessName.trim() !== '') {
      this.suggetionBool = false;
    } else {
      this.suggetionBool = true;
    }
    this.suggestions = [];
    if (this.searchKey.trim() !== '' && this.searchKey?.length > 3 && this.suggetionBool) {
      this.api.get('search?text=' + this.searchKey + '&type=bussinessName').subscribe((res: any) => {
        this.suggestions = [];
        let suggestionData = [];
        let suggestionsArray = [];
        suggestionData = res.searchData[0]?.businessData;
        for (let i = 0; i < suggestionData?.length; i++) {
          suggestionsArray.push(suggestionData[i].businessName);
        }
        let filter = this.searchKey.toLowerCase();
        let i = 0;
        suggestionsArray.map((item) => {
          if (item.toLowerCase().startsWith(filter) && i < 5) {
            this.suggestions.push(item);
            i++;
          }
        });
        suggestionsArray.forEach((name: any) => {
          if (this.searchKey === name) {
            this.businessClaim = true;
          } else {
            this.businessClaim = false;
          }
        });
      });

    } else {
      this.suggestions = [];
    }
  }


  getInfoText() {
    this.api.getInfoSection().subscribe((res: any) => {
      this.claimMessage = res?.sectionData[34]?.description;
    });
  }


  getAutocompleteValue(searchkey: any) {
    this.searchKey = searchkey;
    this.getBusinessNames();
  }

}
