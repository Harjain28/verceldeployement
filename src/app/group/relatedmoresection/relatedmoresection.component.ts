import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-relatedmoresection',
  templateUrl: './relatedmoresection.component.html',
  styleUrls: ['./relatedmoresection.component.scss']
})
export class RelatedmoresectionComponent implements OnInit {
  sectionTitle: any;
  sectionData: any = [];
  sections: any = [];
  DetailType: any;
  id: any;

  constructor(private api: ApiService, private router: Router, private storage: StorageService,
    private route: ActivatedRoute, private event:EventService) { 


    this.route.params.subscribe((params) => {
      this.sectionTitle = params["sectionName"];
      this.DetailType = params['DetailType'];
      this.id = params['id'];
      //console.log(this.DetailType, "detailstype");
      //console.log(this.sectionTitle, "sectiontitle");
        this.getAllrelatedSectionData();
    });
  }

  ngOnInit(): void {
  }

  getAllrelatedSectionData() {
  if (this.DetailType === 'forarticles') {
    this.api.get("articledetailsection?articleId=" + this.id).subscribe((res: any) => {
      for (let i = 0; i <= res.description.length; i++) {
        if (res.description[i]?.title === this.sectionTitle){
          this.sectionData.push(res.description[i]);
          this.sectionData.forEach((item: any) => {
           this.sections.push({ sectionname: item?.sectionname, title: item?.title, sectionValue: item?.section })
         })
        }
     }
    });
  } else if (this.DetailType === 'forevents') {
    this.api.get("eventdetailssection?eventId=" + this.id).subscribe((res: any) => {
      for (let i = 0; i <= res.description.length; i++) {
        if (res.description[i]?.title === this.sectionTitle){
          this.sectionData.push(res.description[i]);
          this.sectionData.forEach((item: any) => {
           this.sections.push({ sectionname: item?.sectionname, title: item?.title, sectionValue: item?.section })
         })
        }
     }
    });
  } else if (this.DetailType === 'forclassess') {
    this.api.get("classdetailsection?classId=" + this.id).subscribe((res: any) => {
      for (let i = 0; i <= res.description.length; i++) {
        if (res.description[i]?.title === this.sectionTitle){
          this.sectionData.push(res.description[i]);
          this.sectionData.forEach((item: any) => {
           this.sections.push({ sectionname: item?.sectionname, title: item?.title, sectionValue: item?.section })
         })
        }
     }
    });
  } else if (this.DetailType === 'forgroups') {
    this.api.get("groupdetailssection?groupsId=" + this.id).subscribe((res: any) => {
      for (let i = 0; i <= res.description.length; i++) {
        if (res.description[i]?.title === this.sectionTitle){
          this.sectionData.push(res.description[i]);
          this.sectionData.forEach((item: any) => {
           this.sections.push({ sectionname: item?.sectionname, title: item?.title, sectionValue: item?.section })
         })
        }
     }
    });
  } 
   
  }

  getArticeDetails(id: any) {
    this.router.navigate(["/articles-details/" + id]);
  }
  getEventsDetails(id: any) {
    this.router.navigate(["/event-details/" + id]);
  }

  getClassDetails(id: any) {
    let newID =  atob(id);
    this.router.navigate(["/view/class-details/" + newID]);
  }
  getGroupDetails(id: any) {
    this.router.navigate(["/group-details/" + id]);
  }

  back(){
    this.event.back();
  }

}
