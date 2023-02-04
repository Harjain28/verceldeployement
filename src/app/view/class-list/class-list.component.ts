import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { EventService } from "src/app/services/event.service";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { StorageService } from "src/app/services/storage.service";
import { Location } from '@angular/common';
import { threadId } from "worker_threads";

@Component({
  selector: "app-class-list",
  templateUrl: "./class-list.component.html",
  styleUrls: ["./class-list.component.scss"],
})
export class ClassListComponent implements OnInit {
  id: any;
  classList: any = [];
  businesssubCategory: any;
  subCategoryName: any;
  Classes: any = [];
  tagvalue: any;
  showtags: boolean = false;
  searchvalue: string = '';
  newclassList: any = [];
  wishlisteddata: any = [];
  myForm: FormGroup;
  sortingbool: boolean = false;
  clearIcon: boolean = false;
  selectsFrom: Array<any> = [
    { value: 1, name: 1, },
    { value: 2, name: 2, },
    { value: 3, name: 3 },
    { value: 4, name: 4 },
    { value: 5, name: 5 },
    { value: 6, name: 6 },
    { value: 7, name: 7 },
    { value: 8, name: 8 },
    { value: 9, name: 9 },
    { value: 10, name: 10 },
    { value: 11, name: 11 },
    { value: 12, name: 12 },
    { value: 13, name: 13 },
    { value: 14, name: 14 },
    { value: 15, name: 15 },
    { value: 16, name: 16 },
    { value: 17, name: 17 },
    { value: 18, name: 18 },
  ]

  selectsTo: Array<any> = [
    // { value: 0, name: 0 },
    { value: 1, name: 1 },
    { value: 2, name: 2 },
    { value: 3, name: 3 },
    { value: 4, name: 4 },
    { value: 5, name: 5 },
    { value: 6, name: 6 },
    { value: 7, name: 7 },
    { value: 8, name: 8 },
    { value: 9, name: 9 },
    { value: 10, name: 10 },
    { value: 11, name: 11 },
    { value: 12, name: 12 },
    { value: 13, name: 13 },
    { value: 14, name: 14 },
    { value: 15, name: 15 },
    { value: 16, name: 16 },
    { value: 17, name: 17 },
    { value: 18, name: 18 },
  ]
  optionsLevels = [];
  selectedOptionsLevels = [];
  agefrom: any;
  ageto: any;
  datefrom: number;
  dateto: number;
  levelId: any = [];
  types: string = 'all';
  selectedlevel: any;
  allLevels: any = [];
  subCategoryId: any;
  classSortingData: any = [];
  classsortingPageNumber: number = 1;
  itemperpage: number = 10;
  isshowClass: boolean = false;
  searchpagenumber: number = 1;
  classPageNumber: number = 1;
  isselectlevel: boolean = false;
  agefromselect: any[];
  agetoselect: any[];
  isfunctionstart: boolean = false;
  favadded: boolean;
  selectnotApplicable: boolean = true;
  selectnew: boolean = true;
  searchKey: string;
  allselectedArray = [];
  allSelected: boolean = true;
  showFilter: boolean;
  resetClick: boolean = false;

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: StorageService,
    private event: EventService,
    private location: Location,
  ) {
    // this.getClassesbytags();
    this.route.params.subscribe((params) => {
      let encodedId = params["id"];
      this.id = btoa(encodedId);
      this.tagvalue = params['value'];

    });
    this.agefromselect = this.selectsFrom;
    this.agetoselect = this.selectsTo;
  }

  ngOnInit(): void {
    if (this.storage.isLoggednIn()) {
      this.getWishlist();
    }
    // this.getAllclasses();
    this.formInit();
    this.getlevelgroup();
    this.event.selectedBranch = '';
    // this.getAgeLocal();

    this.selectedOptionsLevels = this.event.selectedLevelName;
    this.levelId = this.selectedOptionsLevels;
    this.types = this.event.type;
    this.ageto = this.event.Ageto;
    this.agefrom = this.event.AgeFrom;
    if (this.event.selectedLevelName.length > 0) {
      if (this.event.selectedLevelName.toString() === '63242085ed6ecd6708d14352') {
        this.selectnotApplicable = false;
        this.selectnew = true;
        this.allSelected = false;
        this.searchvalue = '';
        this.levelId = this.event.NotApplicableArray;
        this.classSorting();
      } else {
        this.selectnotApplicable = true;
        this.selectnew = false;
        this.allSelected = false;
        this.searchvalue = '';
        this.levelId = this.event.selectedLevelName;
        this.classSorting();
      }
    } else {
      this.getAllclasses();
    }

  }


  getAllclasses() {
    this.isshowClass = true;
    if (this.tagvalue && this.tagvalue.trim() !== '') {
      this.showtags = true;
      this.api.get("searchontype?type=classes&selectedName=" + this.tagvalue).subscribe((res: any) => {
        this.classList = res.data;
        this.newclassList = this.classList;
        // console.log(res,'all class1');
      });
    } else {
      this.showtags = false;
      this.api
        .get("getclassonsubcategory?subcategoryId=" + this.id + '&limit=' + this.itemperpage + '&page=' + this.classPageNumber)
        .subscribe((res: any) => {
          this.classList = res.classData;

          this.newclassList.push(...this.classList);
          this.classList.forEach((element: any) => {
            element.subcategory.forEach((data: any) => {
              if (data._id === this.id) {
                this.subCategoryName = data.subCategory;
                this.subCategoryId = data?._id;
                // console.log(element.subcategory);
              }
            });
          });
        });
    }

  }

  formInit() {
    this.myForm = new FormGroup({
      selectedlevel: new FormControl([]),
    });
  }

  changesiteType() {
    this.resetClick = true;
    this.event.type = this.types;
    this.classsortingPageNumber = 1;
    this.newclassList = [];
    this.searchvalue = '';
    this.classSorting();
  }


  getSelectedlevelOptions(selected) {
    if (selected.length !== 0) {
      this.resetClick = true;
      this.selectedlevel = selected;
      this.levelId = this.selectedlevel;
      if (this.selectedlevel.toString() === '63242085ed6ecd6708d14352') {
        this.selectnotApplicable = false;
        this.selectnew = true;
        this.allSelected = false;
        this.event.NotApplicableArray.push(this.allselectedArray);
        this.event.selectedLevelName = ['63242085ed6ecd6708d14352'];
        this.levelId = this.allselectedArray;
        this.newclassList = [];
        this.classSorting();
      } else {
        this.selectnotApplicable = true;
        this.selectnew = false;
        this.allSelected = true;
        this.event.selectedLevelName = this.levelId;
        this.searchvalue = '';
        this.classsortingPageNumber = 1;
        this.newclassList = [];
        this.classSorting();
      }
      if (this.selectedlevel.length == 0) {
        this.selectnotApplicable = true;
        this.selectnew = true;
      }
    } else {
      this.selectnotApplicable = true;
      this.selectnew = true;
      this.allSelected = true;
      this.levelId = [];
      this.newclassList = [];
      this.classSorting();
    }
  }

  getlevelgroup() {
    this.api.get('getlevelgroup').subscribe((res: any) => {
      this.allLevels = res.levelData;
      this.allLevels = res.levelData.sort((a, b) => a.level.toLowerCase().localeCompare(b.level.toLowerCase()));
      // console.log(res)
      this.allLevels.forEach((element: any) => {
        if (element.level !== 'Not Applicable') {
          this.optionsLevels.push(element);
          this.allselectedArray.push(element._id);
        }
        // if (element.levelName.toString() !== 'Not applicable') {
        //   this.optionsLevels.push({
        //     value: element._id,
        //     display: element.levelName.toString(),
        //   });
        // }
      });
    });
  }


  selectFromAge(event: any) {
    this.resetClick = true;
    this.datefrom = event;
    // this.event.AgeFrom = event;
    this.agetoselect = this.selectsTo.filter((item: any) => {
      return item.value >= event;
    });

    this.agefrom = event;
    this.event.AgeFrom = event;
    this.classsortingPageNumber = 1;
    this.searchvalue = '';
    this.newclassList = [];

    this.classSorting();
  }
  selectToAge(event: any) {
    this.resetClick = true;
    this.event.Ageto = event;
    this.ageto = event;
    // this.event.Ageto = event;
    this.dateto = this.ageto;
    this.classsortingPageNumber = 1;
    this.newclassList = [];
    this.searchvalue = '';
    this.classSorting();
  }

  resetFilter() {
    if (this.resetClick) {
      this.resetClick = false;
      this.isfunctionstart = true;
      this.types = 'all';
      this.optionsLevels = [];
      this.agefrom = '0';
      this.ageto = '0';
      this.event.AgeFrom = '0';
      this.event.Ageto = '0';
      this.searchvalue = '';
      this.selectedlevel = [];
      this.levelId = [];
      this.newclassList = [];
      this.classsortingPageNumber = 1;
      this.selectedOptionsLevels = [];
      this.event.selectedLevelName = [];
      this.unselectAll();
      this.getlevelgroup();
      // this.classSorting();
      // this.getAllclasses();
      if (this.tagvalue) {
        // this.router.navigate(['/view/class-list/' + this.id]);
        // this.getAllclasses();
      }
    }
  }

  classSorting() {
    this.isshowClass = false;
    let requestData = {};
    if (this.levelId.length > 0) {
      requestData['level'] = this.levelId.join(',');
    }
    if (this.agefrom && this.agefrom != null && this.agefrom !== '0') {
      requestData['agefrom'] = this.agefrom;
    } else {
      requestData['agefrom'] = '1';
    }
    if (this.ageto && this.ageto != null && this.ageto !== '0') {
      requestData['ageto'] = this.ageto;
    } else {
      requestData['ageto'] = '18';
    }
    if (this.types && this.types !== '') {
      requestData['type'] = this.types;
    }

    if (this.tagvalue) {
      requestData['tag'] = this.tagvalue;
    }
    requestData['limit'] = this.itemperpage;
    requestData['page'] = this.classsortingPageNumber;
    if (!this.tagvalue) {
      requestData['subcatId'] = this.id;
    }

    this.api.post('sortclasses', requestData).subscribe((res: any) => {
      this.sortingbool = true;
      this.isfunctionstart = false;
      // console.log(res);
      this.classSortingData = res.data;
      // this.newclassList = [];
      this.newclassList.push(...res.data);
      if (this.storage.isLoggednIn()) {
        this.getWishlist();
      }
    });
  }

  getWishlist() {
    const userData = JSON.parse(localStorage.getItem('userdata'));
    this.api.get('getWishlist?type=wishlisted&Objecttype=classes').subscribe((res: any) => {
      // console.log(res.wishlistedData);
      this.wishlisteddata = res.wishlistedData;
      for (let i = 0; i < this.wishlisteddata.length; i++) {
        if (this.wishlisteddata[i].userId?._id === userData?._id) {
          for (let j = 0; j < this.newclassList.length; j++) {
            if (this.newclassList[j]?._id === this.wishlisteddata[i].wishlistedId) {
              this.newclassList[j].selected = true;
            }
          }
        }

      }

    });
  }


  addtoClassWishList(classId: any, likebool: boolean) {
    if (this.storage.isLoggednIn()) {
      this.favadded = likebool;
      for (let i = 0; i < this.newclassList.length; i++) {
        if (this.newclassList[i]._id === classId) {
          this.newclassList[i].selected = true;
          this.favadded = false;
          this.api.alert('Added to Shortlist', 'success');
        }
        //  else {
        //   // this.newclassList[i].selected = false;
        //   // this.api.alert('Remove to wishlist', 'error');
        // }
      }
      let requestData = {};
      requestData["type"] = 'classes';
      requestData["wishlistedId"] = classId;

      this.api.post('addwishlist', requestData).subscribe((res: any) => {
        const favAdded = res.message;
      });
    } else {
      this.router.navigate(["/login/student"]);
    }

  }

  private deleteClassWishlist(classId: any) {
    if (this.storage.isLoggednIn()) {
      for (let i = 0; i < this.newclassList.length; i++) {
        if (this.newclassList[i]._id === classId) {
          this.newclassList[i].selected = false;
          this.api.alert('Removed from Shortlist', 'success');
        }
        //  } else {
        //   this.newclassList[i].selected = true;
        //   // this.api.alert('Add to wishlist', 'error');
        // }
      }
      let requestData = {};
      requestData["wishlistedId"] = classId;

      this.api.post('deletedwishlistitem', requestData).subscribe((res: any) => {
        const favAdded = res.message;
      });
    } else {
      this.router.navigate(["/login/student"]);
    }

  }

  getClassesbytags() {
    this.resetClick = true;
    if (this.searchvalue.trim() === '') {
      this.clearIcon = false;
    } else {
      this.clearIcon = true;
    }

    this.isshowClass = false;
    if (this.tagvalue && this.searchvalue && this.searchvalue.trim() !== '' && this.searchvalue.length > 2) {
      this.api.get("searchontype?type=classes&selectedName=" + this.tagvalue + '&text=' + this.searchvalue + '&limit=' + this.itemperpage + '&page=' + this.searchpagenumber).subscribe((res: any) => {
        this.newclassList = res.data;
        if (this.storage.isLoggednIn()) {
          this.getWishlist();
        }
        this.types = 'all';
        this.levelId = [];
        this.agefrom = '0';
        this.ageto = '0';
        this.event.AgeFrom = '0';
        this.event.Ageto = '0';
        this.levelId = [];
        this.selectedlevel = [];
        this.event.selectedLevelName = [];
        this.selectedOptionsLevels = [];
      });
    } else if (this.searchvalue && this.searchvalue.trim() !== '' && this.searchvalue.length > 2) {
      if (this.storage.isLoggednIn()) {
        this.getWishlist();
      }
      this.types = 'all';
      this.agefrom = '0';
      this.event.AgeFrom = '0';
      this.event.Ageto = '0';
      this.ageto = '0';
      this.levelId = [];
      this.selectedlevel = [];
      this.event.selectedLevelName = [];
      this.selectedOptionsLevels = [];
      if (this.searchpagenumber <= 1) {
        this.newclassList = [];

      }
      const newconst = this.newclassList;
      this.api.get("searchontype?type=classes&selectedName=" + this.subCategoryName + '&text=' + this.searchvalue + '&limit=' + this.itemperpage + '&page=' + this.searchpagenumber).subscribe((res: any) => {
        if (this.storage.isLoggednIn()) {
          this.getWishlist();
        }
        let searchclassData = [];
        searchclassData.push(...newconst, ...res.data);
        this.newclassList = searchclassData;
      });
    } else if (this.searchvalue === '') {
      this.searchpagenumber = 1;
      this.classsortingPageNumber = 1;
      this.newclassList = [];
      this.classSorting();
    }
  }

  getClassCategory(id: any) {
    let encodeID = atob(id);
    this.router.navigate(["/view/class-details/" + encodeID]);
  }

  onScroll(e) {
    if (this.isshowClass) {
      this.classPageNumber += 1;
      this.getAllclasses();
    } else if (!this.isshowClass && this.searchvalue === '') {
      this.classsortingPageNumber += 1;
      this.classSorting();
    }else{
      if (this.searchvalue && !this.isshowClass) {
        this.searchpagenumber += 1;
        this.getClassesbytags();
      }
    }
  }


  onKeySearchLevel(value) {
    this.optionsLevels = this.searchbyLevelName(value);
  }

  searchbyLevelName(value: string) {
    if (value && value.trim() !== '' && value.length > 0) {
      return this.allLevels.filter((level) =>
        level.level.toLowerCase().startsWith(value.toLowerCase())
      )
    } else {
      return this.allLevels;
    }
  }


  clearSearch() {
    // console.log('clicked')
    // this.selectnew = true;
    this.searchKey = '';
    this.onKeySearchLevel('');
  }

  selectAll() {
    this.resetClick = true;
    this.selectedOptionsLevels = [];
    this.selectnew = false;
    this.selectedOptionsLevels = this.allselectedArray;
    this.event.selectedLevelName = this.selectedOptionsLevels;
    this.levelId = this.selectedOptionsLevels;
    this.allSelected = false;
    this.newclassList = [];
    this.classSorting();
    // console.log(this.selectedOptionsLevels, 'this.selectedOptionsLevels');
  }

  unselectAll() {
    this.selectnew = true;
    this.allSelected = true;
    this.selectnew = true;
    this.selectnotApplicable = true;
    this.selectedOptionsLevels = [];
    this.levelId = [];
    this.newclassList = [];
    this.classSorting();
  }

  clearData() {
    this.searchvalue = '';
    this.searchpagenumber = 1;
    this.getClassesbytags();
    this.clearIcon = false;
  }

  showAllfilters() {
    this.showFilter = !this.showFilter;
  }

  back() {
    this.location.back();
  }


}
