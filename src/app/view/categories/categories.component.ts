import { ThrowStmt } from "@angular/compiler";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { OwlOptions } from "ngx-owl-carousel-o";
import { ApiService } from "src/app/services/api.service";
import { EventService } from "src/app/services/event.service";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"],
})
export class CategoriesComponent implements OnInit {
  categoryGroupData: any = [];
  allsubcategory: any;
  newselectProductAttributes = new Map<string, Object>();
  clearIcon: boolean = false;
  searchvalue: any;
  categoryname: any = [];
  newCategoryname: any = [];
  categoryId: any;

  constructor(private api: ApiService, private router: Router, private event:EventService) { }

  @ViewChild("widgetsContent1", { read: ElementRef })
  public widgetsContent1: ElementRef<any>;

  ngOnInit(): void {
    this.getallSubcategory();
  }
  // public scrollLeft1(): void {
  //   this.widgetsContent1.nativeElement.scrollTo({
  //     left: this.widgetsContent1.nativeElement.scrollLeft - 250,
  //     behavior: "smooth",
  //   });
  // }
  // public scrollRight1(): void {
  //   this.widgetsContent1.nativeElement.scrollTo({
  //     left: this.widgetsContent1.nativeElement.scrollLeft + 250,
  //     behavior: "smooth",
  //   });
  // }

  clearData() {
    this.searchvalue = '';
    this.onKeySearchAttributes(this.searchvalue);
    this.clearIcon = false;
  }

  getallSubcategory() {
    if (this.event.categoryData.length === 0) {
      this.api.get("getsubcategorycategorywise").subscribe((item: any) => {
        this.allsubcategory = item.categoryData;
        this.allsubcategory.forEach((cate) => {
          this.newselectProductAttributes.set(cate._id, [...cate.subcategoryData]);
        });
        this.allsubcategory.filter(element => {
          this.newCategoryname.push({ categorynum: +element.category.split('. ')[0], categoryname: element.category.split('. ')[1], subcategory: element.subcategoryData });
          return this.newCategoryname.sort((a: any, b: any) => {
            return a.categorynum - b.categorynum;
          });
        });
        this.categoryname = this.newCategoryname;
      });
    }else{
        this.allsubcategory = this.event.categoryData.categoryData;
        this.allsubcategory.forEach((cate) => {
          this.newselectProductAttributes.set(cate._id, [...cate.subcategoryData]);
        });
        this.allsubcategory.filter(element => {
          this.newCategoryname.push({ categorynum: +element.category.split('. ')[0], categoryname: element.category.split('. ')[1], subcategory: element.subcategoryData });
          return this.newCategoryname.sort((a: any, b: any) => {
            return a.categorynum - b.categorynum;
          });
        });
        this.categoryname = this.newCategoryname;
    }
  }

  redirecttoSearch(value: any , selecttype: any) {
    if (selecttype === 'category') {
       this.categoryname.forEach(element => {
         element.subcategory.forEach(cat => {
          if (cat.subCategory === value) {
            this.categoryId = cat?._id;
          }
         });
       });
       this.event.setHomeSearchData({
        searchdata:  value,
        searchType: 'Classes',
        selectype: selecttype,
        categoryId: this.categoryId
      });
      this.event.setHeaderSearchdata({
        searchdata:  '',
        searchType: 'Classes',
      });
      this.router.navigate(["/view/search/" + 'Classes' + "/" + selecttype]);
    }
     
  }
  

  onKeySearchAttributes(value) {
    this.searchvalue = value;
    this.searchsubattributes(value);
    // this.newselectProductAttributes = this.searchsubattributes(value , id);
  }


  searchsubattributes(value: string) {
    if ((value && value.trim() !== '')) {
      this.clearIcon = true;
      let filter = value.toLowerCase();
      let i = 0;
      for (let i = 0; i < this.newCategoryname.length; i++) {
        // this.categoryname[i].subcategoryData = this.newselectProductAttributes.get(this.categoryname[i]._id);
        if ((value && value.trim() !== '')) {
          this.categoryname[i].subcategory = this.newCategoryname[i].subcategory.filter((item) =>{
           return item.subCategory.toLowerCase().startsWith(filter)
          });
        }
      }
    } else {
      this.newCategoryname = [];
      this.categoryname = [];
      this.getallSubcategory();
      this.clearIcon = false;
    }
  }

  back(){
    this.event.back();
  }
}
