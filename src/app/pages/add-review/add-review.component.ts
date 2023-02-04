import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent implements OnInit {

  stars: any[] = [1, 2, 3, 4, 5];
  selectedValue: any;
  id: any;
  classSubcategory: any;
  allClassDetails: any = [];
  className: any;
  myForm: FormGroup
  API_URL: any;
  myFiles: any = [];
  images: any = [];
  index: number;
  imagesDefault: any;
  branchName: any;
  isReviewSubmit =  true;
  israting: boolean = false;
  errormessage: any;
  
  constructor(
    private http: HttpClient,
    private api: ApiService,
    private event: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.API_URL = environment.BASE_API_ENDPOINT;
    this.route.params.subscribe((params) => {
      this.id = params["id"];
      this.branchName =  params["branchName"];
       //console.log(this.id);
        this.api.get("classDetails?classId=" + this.id).subscribe((res: any) => {
          //console.log(res, "classDetails");
          this.allClassDetails = res.classData;
          this.className = this.allClassDetails?.businessName;
          this.classSubcategory = this.allClassDetails?.businesssubCategory.map((item) => {
            return item.subCategory;
          })
          .join(", ");
         
    });
  });

}

  ngOnInit(): void {
    this.formInit();
  }
  

  formInit() {
    this.myForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      reviewDescription: new FormControl(''),
      image: new FormControl('' ),
    });
  }
   
    countStar(star) {
      this.selectedValue = star;
    }

    deleteImage(i: any): void {
      this.index = i;
      this.images.splice(i, 1);
      this.myFiles.splice(i, 1);
      (<HTMLInputElement>document.getElementById(`upLoader${i}`)).value = '';
    }
  
    // deleteEditImage(i: any): void {
    //   this.imagesDefault.splice(i, 1);
    // }
  
    onFileChange(event) {
      for (var i = 0; i < event.target.files.length; i++) {
        this.myFiles.push(event.target.files[i]);
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.images.push(event.target.result);
        };
        reader.readAsDataURL(event.target.files[i]);
      }
  
    }

  submitReview() {
    this.israting = true;
    // if (!this.selectedValue) {
    //   this.errormessage = 'star rating is required';
    // }
    const formvalue = this.myForm.value;
    const formData: FormData = new FormData();

    formData.append("classId", this.id);
    formData.append("branchName", this.branchName); 
    formData.append("title", formvalue.title); 
   
    if (this.selectedValue) {
      formData.append("rating", this.selectedValue.toString());
    }

    formData.append("review", formvalue.reviewDescription);
    
    for (var i = 0; i < this.myFiles.length; i++) {
      formData.append("image", this.myFiles[i]);
    }

    const headers = new HttpHeaders({
      Authorization: localStorage.getItem("LoggedIn"),
    });
  
      this.isReviewSubmit = false;
      if (this.myForm.valid && this.selectedValue) {
      this.http.post(`${this.API_URL}createreview`, formData, { headers: headers }).subscribe((res: any) => {
          //console.log(res);
          if (res.status == true) {
            this.isReviewSubmit = true;
            let newid = atob(this.id)
            this.router.navigate(["view/class-details/" + newid]);
          } else {
            this.api.alert(res.message, "error");
            this.isReviewSubmit = true;
          }
        });
    } else {
      this.myForm.markAllAsTouched();
      this.isReviewSubmit = true;
    }
  }

  back(){
    this.event.back();
  }

}
