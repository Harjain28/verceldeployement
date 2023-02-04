import { I } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  albumData: any = [];
  branchName: any;
  showDeleteModal: boolean = false;
  private __Id: any;
  disabledBranchAdmin: string;
  typeDisabled: Boolean;
  fulldata: any;
  data: any;
  adminId: any;
  userName: any;

  constructor(private api: ApiService,
    private event: EventService,
    private router: Router) {
    this.disabledBranchAdmin = localStorage.getItem('__admintype')
  }

  ngOnInit(): void {
    this.data = localStorage.getItem("userdata");
    this.fulldata = JSON.parse(this.data);
    this.adminId = this.fulldata._id;
    this.userName = this.fulldata.name;
    if (this.event.businessDetails) {
      this.getGalleryDetailsFromEvent();
    }else{
      this.getGalleryDetails();
    }
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
    this.api.post("deletegallery", requestData).subscribe((res: any) => {
      if (res.status == true) {
        this.event.businessDetails = false;
        this.showDeleteModal = false;
        this.albumData = this.albumData.filter((item: any) => {
          return item.id !== this.__Id;
        })
      }
    })
    // this.showDeleteModal = false;
  }

  getGalleryDetails() {
    this.api.getBusineesdetails().subscribe((res: any) => {
      // this.albumData = res.albumData;
      res.results[4].albumData.forEach((album: any) => {
        this.branchName = album.userId.map((item: any) => {
          return item.branchName;
        }).slice(1).join(', ')

        if (this.disabledBranchAdmin == 'admin') {
          this.typeDisabled = false;
        } else if (this.disabledBranchAdmin == 'subadmin') {
          this.typeDisabled = album.type == 'admin' ? true : false;
        } else {
          this.typeDisabled = false;
        }

        this.albumData.push({
          id: album._id, albumName: album.albumName == 'undefined' ? "" : album?.albumName,
          classId: album.classId, branchName: this.branchName, isDisabled: this.typeDisabled,
          status: album.status, trending: album.trending, albumbybranchName: album?.createdby, image: album.image[0]
        })
        //console.log(this.albumData);
      })
    });
  }
  
  getGalleryDetailsFromEvent() {
      // this.albumData = res.albumData;
      this.event.businessDetails.results[4].albumData.forEach((album: any) => {
        this.branchName = album.userId.map((item: any) => {
          return item.branchName;
        }).slice(1).join(', ')

        if (this.disabledBranchAdmin == 'admin') {
          this.typeDisabled = false;
        } else if (this.disabledBranchAdmin == 'subadmin') {
          this.typeDisabled = album.type == 'admin' ? true : false;
        } else {
          this.typeDisabled = false;
        }

        this.albumData.push({
          id: album._id, albumName: album.albumName == 'undefined' ? "" : album?.albumName,
          classId: album.classId, branchName: this.branchName, isDisabled: this.typeDisabled,
          status: album.status, trending: album.trending, albumbybranchName: album?.createdby, image: album.image[0]
        })
      })
  }
  editalbumDetails(id: any) {
    this.router.navigate(["/pages/add-gallery/" + id]);
  }

  back(){
    this.event.back();
  }
}
