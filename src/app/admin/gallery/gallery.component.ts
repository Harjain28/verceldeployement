import { HttpClient, HttpHeaders } from '@angular/common/http';
import { I } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  albumData: any = [];
  branchName: any;
  userId: any;
  token: any;
  showDeleteModal: boolean = false;
  private __Id: any;
  disabledBranchAdmin: string;
  typeDisabled: Boolean;
  fulldata: any;
  data: any;
  adminId: any;
  userName: any;
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
    this.data = localStorage.getItem("userData");
    this.fulldata = JSON.parse(this.data);
    this.adminId = this.fulldata._id;
    this.userName = this.fulldata.name;
    this.getGalleryDetails();
  }

  deleteItem(id: any) {
    this.__Id = id;
    this.showDeleteModal = true;
  }
  hideModal() {
    this.showDeleteModal = false;
  }

  deleteAlbumDetails() {
    let requestData = {};
    requestData["galleryId"] = this.__Id;
    const headers = new HttpHeaders({
      Authorization: localStorage.getItem("admintoken"),
    });
    this.http.post(`${this.API_URL}admindeletegallery`, requestData, { headers: headers }).subscribe((res: any) => {
      if (res.status == true) {
        this.showDeleteModal = false;
        this.albumData = this.albumData.filter((item: any) => {
          return item.id !== this.__Id;
        })
      }
      //console.log(res);
    })
    // this.showDeleteModal = false;
  }

  getGalleryDetails() {
    this.api.getAdminBusinessDetails().subscribe((res: any) => {
      //console.log(res);
      // this.albumData = res.albumData;
      res.results[4].albumData.forEach((album: any) => {
        this.branchName = album.userId.map((item: any) => {
          //console.log(item)
          return item.branchName;
        }).slice(1).join(', ')

        this.albumData.push({
          id: album._id, albumName: album.albumName === 'undefined' ? "" : album?.albumName,
          classId: album.classId, branchName: this.branchName,
          status: album.status, trending: album.trending, image: album.image[0]
        })
      })
    });
  }

  editalbumDetails(id: any) {
    this.router.navigate([`/admin/add-gallery/${id}/${this.userId}/${this.token}`]);
  }

  handleadminroute(name: any) {
    this.router.navigate([`/admin/${name}/${this.userId}/${this.token}`])
  }

  back(){
    this.event.back();
  }
}
