import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "src/app/services/api.service";
import { EventService } from "src/app/services/event.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-business-banner-edit",
  templateUrl: "./business-banner-edit.component.html",
  styleUrls: ["./business-banner-edit.component.scss"],
})
export class BusinessBannerEditComponent implements OnInit {
  myFiles: string[] = [];
  myForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    file: new FormControl("", [Validators.required]),
    // fileSource: new FormControl("", [Validators.required]),
  });
  API_URL: string;
  localValue: string = localStorage.getItem("businessId");
  images: any = [];
  url: any;
  constructor(private http: HttpClient, private api: ApiService, private event:EventService) {
    this.API_URL = environment.BASE_API_ENDPOINT;
  }

  get f() {
    return this.myForm.controls;
  }
  ngOnInit(): void {}
  previews = [];

  onFileChange(event) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.images.push(event.target.result);
      };
      reader.readAsDataURL(event.target.files[i]);
    }

    const formData: FormData = new FormData();
    // console.log(formData, "formData");
    for (var i = 0; i < this.myFiles.length; i++) {
      formData.append("images", this.myFiles[i]);
    }

    formData.append("classId", this.localValue.toString());
    const headers = new HttpHeaders({
      Authorization: localStorage.getItem("LoggedIn"),
    });

    this.http
      .post(`${this.API_URL}uploadImages`, formData, {
        headers: headers,
      })
      .subscribe((res) => {
        // console.log(res);
      });
  }

  submit() {}

  // getFormData() {
  //   let formData = new FormData();
  //   for (var i = 0; i < this.myForm.controls.fileSource.value.length; i++) {
  //     formData.append("file[]", this.myForm.controls.fileSource.value);
  //   }
  //   console.log("hello", formData);
  //   const headers = new HttpHeaders({
  //     "Content-Type": "multipart/form-data; boundary=" + Math.random(),
  //     Authorization: localStorage.getItem("LoggedIn"),
  //   });
  //   this.http
  //     .post(`${this.API_URL}uploadImages`, formData, {
  //       headers: headers,
  //     })
  //     .subscribe((res) => {
  //       console.log(formData);
  //     });
  // }

  back(){
    this.event.back();
  }
}
