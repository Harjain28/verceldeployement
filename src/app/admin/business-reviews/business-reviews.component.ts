import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-business-reviews',
  templateUrl: './business-reviews.component.html',
  styleUrls: ['./business-reviews.component.scss']
})
export class BusinessReviewsComponent implements OnInit {
  userId: any;
  token: any;
  allreviews: any = [];
  data: string;
  fulldata: any;
  classId: any;
  showAddreview: boolean = true;
  replyBox: boolean = false;
  showreplyReview: boolean = false;
  replyvalue: any;
  ReviewId: any;
  reveiewId: any;
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;
  API_URL: any;

  constructor(private api: ApiService,
    private event: EventService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,) {
      this.API_URL = environment.BASE_API_ENDPOINT;
    this.route.params.subscribe((params) => {
      this.userId = params.userId;
      this.token = params.token;
      localStorage.setItem("admintoken", this.token);
      localStorage.setItem("businessadminid", this.userId);
    })
  }

  ngOnInit(): void {
    this.data = localStorage.getItem("classData");
    this.fulldata = JSON.parse(this.data);
    this.classId = this.fulldata._id;
    this.getAllreview();
  }

  getAllreview() {
    this.api.get('getreview?classId=' + this.classId).subscribe((res: any) => {
      this.allreviews = res.data;
      //console.log(this.allreviews);
    });
  }

  SendReply(id: any) {
    this.ReviewId = id;
    this.showreplyReview = true;
    this.replyBox = false;
    let requestdata = {};
    requestdata['reviewId'] = this.ReviewId;
    requestdata['replyreview'] = { review: this.replyvalue };
    this.api.post('replyreview', requestdata).subscribe((res: any) => {
      //console.log(res);
      if (res && res.status == true) {
        this.replyvalue = '';
        this.getAllreview();
      }

    });
  }

  back(){
    this.event.back();
  }

}
