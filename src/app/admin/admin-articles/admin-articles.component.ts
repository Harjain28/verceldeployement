import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { EventService } from "src/app/services/event.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-admin-articles",
  templateUrl: "./admin-articles.component.html",
  styleUrls: ["./admin-articles.component.scss"],
})
export class AdminArticlesComponent implements OnInit, OnDestroy {
  id: any;
  ArticleList: any = [];
  title: any;
  subject: any;
  bannerImage: any;
  authorName: any;
  image: any;
  description: any;
  authorimage: any;
  authordescription: any;
  createdDate: any;
  token: any;
  httpOptions: { headers: HttpHeaders };
  newtoken: any;
  userId: any;
  API_URL: string;

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private event: EventService
  ) {
    this.API_URL = environment.BASE_API_ENDPOINT;
    this.route.params.subscribe((params) => {
      this.id = params.id;
      this.userId = params.userId;
      this.token = params.token;
      localStorage.setItem("admintoken", this.token);
      localStorage.setItem("businessadminid", this.userId);
      this.newtoken = localStorage.getItem("admintoken");
      this.httpOptions = {
        headers: new HttpHeaders({
          Authorization: this.newtoken,
        }),
      };
      this.http
        .get(
          `${this.API_URL}getarticlesbyidAdmin?articleId=` +
          this.id,
          { headers: this.httpOptions.headers, params }
        )
        .subscribe((res: any) => {
          this.ArticleList = res.articleData;
          // console.log(res, "getarticlesbyid");
          this.title = this.ArticleList?.title;
          this.subject = this.ArticleList?.subject;
          this.bannerImage = this.ArticleList?.banner;
          this.authorName = this.ArticleList?.authorName;
          this.image = this.ArticleList?.image;
          this.description = this.ArticleList?.description[0];
          this.authorimage = this.ArticleList?.authorimage;
          this.authordescription = this.ArticleList?.authordescription;
          this.createdDate = this.ArticleList?.createdDate;
        });
    });
  }

  ngOnInit(): void { }
  // redirectAdmin() {
  //   this.router.navigate(["/admin/admin-articles/:id/:token"]);
  // }
  ngOnDestroy(): void {
    this.router.navigate([`/admin/admin-articles/${this.id}/${this.userId}/${this.token}`]);
  }

  back(){
    this.event.back();
  }
}
