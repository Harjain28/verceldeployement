import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
@Component({
  selector: 'app-create-job-facebook',
  templateUrl: './create-job-facebook.component.html',
  styleUrls: ['./create-job-facebook.component.scss']
})
export class CreateJobFacebookComponent implements OnInit {

  constructor() { }
  contactForm = new FormGroup({
    cars: new FormControl(),
    title: new FormControl(),
    car: new FormControl(),
    description: new FormControl(),
  })
  jobForm = new FormGroup({
    description1: new FormControl(),
    url: new FormControl(),
    budget: new FormControl(),
    duration: new FormControl(),
    delivery: new FormControl(),
  })
  ngOnInit(): void {
  }
  onSubmit() {
    console.log(this.contactForm.value);
  }
  onSubmition() {
    console.log(this.jobForm.value);
  } 

}