import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { timeStamp } from 'console';
import { CarouselComponent, OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselService } from 'ngx-owl-carousel-o/lib/services/carousel.service';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { StorageService } from 'src/app/services/storage.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home-search',
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.scss']
})
export class HomeSearchComponent implements OnInit, OnDestroy {
  resetEventSubscription: Subscription;

  allsearchdata: any = [];
  timer: any;
  classData: any = [];
  groupsearchData: any = [];
  articlesData: any = [];
  searchKey: any;
  eventsData: any = [];
  myForm: FormGroup;
  myClassForm: FormGroup;
  selectedlevel: any;
  allLevels: any = [];
  nearme: any;
  location: any;
  filternear: boolean;
  filterloc: boolean;
  optionsLevels = [];
  optionsClasses = [];
  newOptionsClasses = [];
  locations: boolean = true;
  selectedOptionsLevels = [];
  selectedCategoryLevel = [];
  agefrom: any;
  ageto: any;
  agefilter: string;
  sitetype: string;
  datefrom: number = 1;
  dateto: number = 18;
  types = 'all';
  levelId: any = [];
  userAddress: string = ''
  userLatitude: string = ''
  userLongitude: string = ''
  joingroupId: any;
  type: string;
  groupgroupsData: any;
  loginOrNot: string;
  selected: boolean;
  lat2: any;
  lng2: any;
  filterType: string;
  @ViewChild('myHeader') myHeader: HeaderComponent;
  agefromselect: any[];
  agetoselect: any[];
  isfunctionstart: boolean = false;
  startsearchfunction: any = true;
  newbool: boolean = false;
  allselectedArray = [];
  searchKey2: any;
  catSearchKey: any;
  allCatSelectBool: boolean = false;
  resetClick: boolean = false;
  showLocationEnable: boolean = false;
  allsubcategory: any = [];
  locationKey: any;
  searchType: any;
  filterBarShowBool: boolean = false;
  searchValue: any;
  applyFilterbuttonDisabled: boolean = true;
  categoryId: any = [];
  isOnlineselected: boolean = false;
  showNotFoundMssg: boolean = false;
  classItemPerpage: number = 16;
  classPageNumber: number = 1;
  eventItemPerPage: number = 18;
  eventPageNumber: number = 1;
  articleItemPerPage: number = 16;
  articlePageNumber: number = 1;
  selectype: any;
  oldSearchKey: any = '';
  oldSearchType: any = '';
  oldselectype: any = '';
  subscription: Subscription;
  articalDataLength: any;
  eventsDataLength: any;
  searchKeys: any;
  headingVal: any;
  selectvalue: any;
  homeSearchKey: any;
  homeSearchType: any;
  oldhomeSearchKey: any;
  oldhomeSearchType: any
  homesubscription: Subscription;
  homecategoryId: any = [];
  allselectedCatArray: any = [];
  siteTypeBool: boolean;
  allowLocation: boolean = false;
  showExtraFilters: boolean = false;
  selectedCategory: any = '';

  constructor(
    private api: ApiService,
    private router: Router,
    private storage: StorageService,
    private event: EventService,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe((params) => {
      this.searchType = params["searchType"];
      this.searchValue = params["searchValue"];
      if (this.searchType === 'Classes') {
        this.classData = [];
        this.eventsData = [];
        this.articlesData = [];
        this.filterBarShowBool = true;
      } else {
        this.filterBarShowBool = false;
      }
    });
    this.resetEventSubscription = this.event.getResetEvent().subscribe(() => {
      this.resetFilter();
    });
    this.agefromselect = this.selectsFrom;
    this.agetoselect = this.selectsTo;
    // this.types = this.event.searchType;
  }

  options = {
    componentRestrictions: {
      country: ["SG"]
    }
  }

  selectsFrom: Array<any> = []
  selectsTo: Array<any> = []

  // customOptions: OwlOptions = {
  //   loop: true,
  //   mouseDrag: true,
  //   touchDrag: true,
  //   pullDrag: true,
  //   dots: false,
  //   autoplay: true,
  //   navSpeed: 700,
  //   autoWidth: true,
  //   items: 6,
  //   responsive: {
  //     0: {
  //       items: 2,
  //     },
  //     400: {
  //       items: 2,
  //     },
  //     740: {
  //       items: 5,
  //     },
  //     940: {
  //       items: 6,
  //     }
  //   },
  //   nav: false
  // };

  // @ViewChild('owlElement1', { static: true }) owlElement1: CarouselComponent;

  ngOnInit(): void {
    for (let i = 1; i <= 18; i++) {
      this.selectsFrom.push({ value: i, name: i });
      this.selectsTo.push({ value: i, name: i });
    }
    this.loginOrNot = localStorage.getItem("LoggedIn");
    this.getlevelgroup();
    this.getOptionsCategories();
    this.formInit();
    this.FetchAlldatabyHeader();
    this.FetchAlldatabyHome();
  }


  FetchAlldatabyHeader() {
    this.categoryId = [];
    setTimeout(() => {
      this.subscription = this.event.getHeaderSearchdata().subscribe(data => {
        this.searchKey = Object.values(data)[0];
        this.searchType = Object.values(data)[1];
        if (this.searchKey !== undefined) {
          this.searchValue = this.searchKey;
        }
        if (this.searchKey.trim() !== '' && this.searchKey.length >= 3) {
          if (this.searchKey !== this.oldSearchKey || this.searchType !== this.oldSearchType) {
            if (this.searchType === 'Classes') {
              this.headingVal = `Search Result of ${this.searchKey !== undefined ? this.searchKey : " "} ${this.searchType !== undefined ? this.searchType : this.router.navigate(["/"])}`
              this.classData = [];
              this.resetClick = false;
              this.classPageNumber = 1;
              this.isfunctionstart = true;
              this.levelId = [];
              this.selectedlevel = [];
              this.categoryId = [];
              this.homecategoryId = [];
              this.types = 'all';
              this.selectedOptionsLevels = [];
              this.selectedCategoryLevel = [];
              this.locations = true;
              this.filternear = false;
              this.datefrom = 1;
              this.dateto = 18;
              this.agefrom = '0';
              this.ageto = '0';
              this.classData = [];
              this.showNotFoundMssg = false;
              this.getClassDatabySearch();
            } else {
              this.datefrom = undefined;
              this.dateto = undefined;
              this.agefrom = undefined;
              this.ageto = undefined;
              this.types = undefined;
              this.levelId = [];
              this.filterBarShowBool = false;
              this.showNotFoundMssg = false;
              //  this.optionsLevels = [];
              this.homecategoryId = [];
              this.selectedlevel = [];
              this.categoryId = [];
              this.classData = [];
              this.eventsData = [];
              this.articlesData = [];
              this.eventPageNumber = 1;
              this.articlePageNumber = 1;
              this.SearchALl();
            }
          }
        } else {
          this.classData = [];
          this.eventsData = [];
          this.articlesData = [];
          this.types = 'all';
          this.searchKey = '';
          this.searchValue = '';
          this.datefrom = 1;
          this.dateto = 18;
          this.agefrom = '0';
          this.ageto = '0';
          this.isfunctionstart = true;
          this.locationKey = '';
          this.filternear = false;
          this.categoryId = [];
          this.levelId = [];
          this.selectedCategoryLevel = [];
          this.selectedOptionsLevels = [];
          // this.showNotFoundMssg = true;
          this.headingVal = `Search Result of ${this.searchKey !== undefined ? this.searchKey : " "} ${this.searchType !== undefined ? this.searchType : ''}`
        }

        this.oldSearchKey = this.searchKey;
        this.oldSearchType = this.searchType;
      })
    }, 10);

    if (this.event.selectedLevelName.length > 0) {
      // this.selectedOptionsLevels = this.event.selectedLevelName;
      this.levelId = this.event.selectedLevelName;
      // this.getClassDatabySearch();
    } 
  }


  FetchAlldatabyHome() {

    setTimeout(() => {
      this.homesubscription = this.event.getHomeSearchData().subscribe(data => {
        this.homeSearchKey = Object.values(data)[0];
        this.homeSearchType = Object.values(data)[1];
        this.selectype = Object.values(data)[2];
        this.homecategoryId = Object.values(data)[3];
        if (this.searchKey.trim() === '') {
          if (this.homeSearchKey !== this.oldhomeSearchKey || this.homeSearchType !== this.oldhomeSearchType || (this.selectype && (!this.oldselectype || this.selectype !== this.oldselectype))
            || (!this.selectype && this.oldselectype && this.oldselectype !== '')) {
            if ((this.selectype !== 'nearme' && this.selectype !== 'location') || this.selectype === undefined) {
              this.headingVal = `Search Result of ${this.homeSearchKey !== undefined ? this.homeSearchKey : " "} ${this.homeSearchType !== undefined ? this.homeSearchType : this.router.navigate(["/"])}`
              if (this.selectype === 'Online') {
                this.showExtraFilters = true;
                this.siteTypeBool = true;
                this.types = this.selectype;
                // this.event.searchType = this.selectype;
                this.categoryId = [];
                this.homecategoryId = [];
                this.resetClick = true;
              } else if (this.selectype === 'category') {
                this.showExtraFilters = true;
                this.searchValue = '';
                this.types = 'all';
                this.searchKey = '';
                this.selectedCategoryLevel.push(this.homecategoryId);
                this.categoryId = this.homecategoryId;
                this.resetClick = true;
              } else {
                this.types = 'all';
                this.levelId = [];
                this.selectedlevel = [];
                this.categoryId = [];
                this.homecategoryId = [];
              }
              this.classPageNumber = 1;
              this.classData = [];
              // this.homecategoryId = [];
              this.showNotFoundMssg = false;
              this.filterBarShowBool = true;
              this.classPageNumber = 1;
              this.isfunctionstart = true;
              this.locations = true;
              // this.categoryId = [];
              this.levelId = [];
              this.filternear = false;
              this.datefrom = 1;
              this.dateto = 18;
              this.agefrom = '0';
              this.ageto = '0';
              this.getClassDatabySearch();
            } else {
              if (this.selectype === 'nearme') {
                this.headingVal = `Search Result Near me Classes`
                this.checkValue('nearme');
                this.filternear = true;
                this.searchKey = '';
                this.resetClick = true;
              } else {
                this.resetClick = true;
                this.headingVal = `Classes within 2 km of ${this.homeSearchKey.name}`
                this.locationKey = this.homeSearchKey.name;
                this.searchValue = '';
                this.handleAddressChange(this.homeSearchKey);

              }
            }
          }
        }
        this.oldhomeSearchKey = this.homeSearchKey;
        this.oldhomeSearchType = this.homeSearchType;
        this.oldselectype = this.selectype;

      })
    }, 10);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.homesubscription.unsubscribe();
  }

  formInit() {
    this.myForm = new FormGroup({
      selectedlevel: new FormControl([]),
    });

    this.myClassForm = new FormGroup({
      selectedCategory: new FormControl([]),
    });
  }

  getLocation = async () =>
    new Promise<void>((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: any) => {
          this.lat2 = position.coords.latitude;
          this.lng2 = position.coords.longitude;
          resolve();
        });
      } else {
        alert('Geolocation is not supported by this browser.');
        reject();
      }
    });


  getSelectedlevelOptions(selected) {
    this.applyFilterbuttonDisabled = false;
    this.resetClick = true;
    this.selectedlevel = selected;
    this.selectedCategory = selected;
    this.event.selectedLevelSearch = [];
    if (selected.length !== 0) {
      this.showExtraFilters = true;
      // this.event.selectedLevelName = this.selectedlevel;
      this.levelId = this.selectedlevel;
    } else {
      this.showExtraFilters = false;
      // this.levelId = this.allselectedArray;
    }
    this.filterType = 'filter';
  }

  getSelectedCategory(selected) {
    if (selected.length > 0  || this.selectedCategory !== '') {
      this.resetClick = true;
      this.applyFilterbuttonDisabled = false;
      this.showExtraFilters = true;
      this.categoryId = selected;
    }else{
      this.applyFilterbuttonDisabled = true;
      this.showExtraFilters = false;
      this.categoryId = selected;
    }
    // this.searchKey = selected;
  }

  getOptionsCategories() {
    this.optionsClasses = [];
    this.api.get("getsubcategorycategorywise").subscribe((item: any) => {
      this.allsubcategory = item.categoryData;
      for (let i = 0; i < this.allsubcategory.length; i++) {
        for (let j = 0; j < this.allsubcategory[i].subcategoryData.length; j++) {
          this.optionsClasses.push({ subcategoryName: this.allsubcategory[i].subcategoryData[j].subCategory, subcategoryId: this.allsubcategory[i].subcategoryData[j]._id });
          this.allselectedCatArray.push(this.allsubcategory[i].subcategoryData[j]._id);
        }
      }
      let val = 'subcategoryName';
      this.optionsClasses.sort((a, b) => (a[val] || "").toString().localeCompare((b[val] || "").toString()));
      this.newOptionsClasses = this.optionsClasses;
    });
  }

  getlevelgroup() {
    this.api.get('getlevelgroup').subscribe((res: any) => {
      this.allLevels = res.levelData;
      this.allLevels = res.levelData.sort((a, b) => a.level.toLowerCase().localeCompare(b.level.toLowerCase()));
      this.allLevels.forEach((element: any) => {
        if (element.level !== 'Not Applicable') {
          this.optionsLevels.push(element);
          this.allselectedArray.push(element._id);
        }
      });
    });
  }

  changesiteType() {
    if (this.types === 'Online') {
      this.nearme = '';
      this.filternear = false;
    }
    this.resetClick = true;
    this.applyFilterbuttonDisabled = false;
    // this.event.searchType = this.types;
    this.selectype = this.types;
  }

  selectFromAge(event: any) {
    this.resetClick = true;
    this.applyFilterbuttonDisabled = false;
    this.isfunctionstart = false;
    this.datefrom = event;
    // this.event.AgeFromSearch = event;
    // this.event.dateFromSearch = event;
    this.agetoselect = this.selectsTo.filter((item: any) => {
      return item.value >= event;
    });
    this.agefrom = event;
    this.filterType = 'filter';
  }
  selectToAge(event: any) {
    this.resetClick = true;
    this.isfunctionstart = false;
    this.applyFilterbuttonDisabled = false;
    this.event.AgetoSearch = '';
    this.ageto = event;
    // this.event.AgetoSearch = event;
    // this.event.dateToSearch = event;
    this.dateto = this.ageto;
    this.filterType = 'filter';
  }

  applyfilter() {
    if (this.locationKey?.length === 0) {
      this.headingVal = `Search Result of ${this.searchKey !== undefined ? this.searchKey : " "} ${this.searchType !== undefined ? this.searchType : ''}`
    }
    this.applyFilterbuttonDisabled = true;
    this.allowLocation = false;
    this.classData = [];
    this.searchValue = this.searchKey;
    this.changesiteType();
    if ((this.locationKey && this.locationKey.trim() !== '') || this.selectype === 'location') {
      this.filterloc = true;
      // if (this.homeSearchKey && this.homeSearchKey !== undefined) {
      this.handleAddressChange(this.homeSearchKey);
      // } 
    } else if (this.selectype === 'nearme' || this.filternear) {
      this.checkValue('nearme');
    } else {
      this.selectype = '';
      // this.classData = [];
      this.classPageNumber = 1;
      this.getClassDatabySearch();

    }
  }

  // SearchALldata(value: any) {
  //   this.searchKey = value;
  //   this.event.searchKey = value;
  //   this.SearchALl();
  // }

  redirecttoMorepage(itemName: any) {
    // this.router.navigate(['/view/searchmoredataof/' + itemName + '/' + this.searchKey]);
  }

  getClassDatabySearch() {
    let classdatabySearch = [];
    this.locationKey = '';
    this.filternear = false;
    classdatabySearch = [];
    this.showNotFoundMssg = false;
    // const userData = JSON.parse(localStorage.getItem('userdata'));
    if (this.selectype === 'Online' && this.searchKey.trim() === '') {
      this.searchValue = '';
      this.types = 'Online';
    } else if (this.selectype === 'category' && this.searchKey.trim() === '') {
      this.searchValue = '';
    }

    this.api.get("search?text=" + this.searchValue + '&name=class&type=filter' + '&datefrom=' + this.datefrom + '&dateto=' + this.dateto + '&levelId=' + this.levelId + '&categoryid=' + this.categoryId + '&sitetype=' + this.types + '&limit=' + this.classItemPerpage + '&page=' + this.classPageNumber).subscribe((res: any) => {
      // this.filterBarShowBool = false;
      this.allsearchdata = res.searchData;
      this.isfunctionstart = false;
      classdatabySearch = [];
      classdatabySearch = res.searchData[0]?.classData;
      this.classData.push(...classdatabySearch);
      if (this.classData?.length > 0) {
        this.filterBarShowBool = true;
        this.showNotFoundMssg = false;
      } else {
        this.showNotFoundMssg = true;
        this.filterBarShowBool = true;
      }
      this.eventsData = [];
      this.articlesData = [];
      // this.applyFilterbuttonDisabled = false;
    });

  }

  SearchALl() {
    let eventSearchData = [];
    let articleSearchdata = [];
    let searchItemPerPage = 0;
    let searchPageNumber = 0;
    this.showNotFoundMssg = false;
    this.filterBarShowBool = false;
    if (this.searchValue === 'all') {
      this.searchValue = '';
    }
    const userData = JSON.parse(localStorage.getItem('userdata'));
    this.levelId = '';
    if (this.searchType === 'event') {
      this.articlePageNumber = 1;
      searchItemPerPage = this.eventItemPerPage;
      searchPageNumber = this.eventPageNumber;
    } else {
      this.eventPageNumber = 1;
      searchItemPerPage = this.articleItemPerPage;
      searchPageNumber = this.articlePageNumber;
    }
    this.api.get("search?text=" + this.searchValue + '&name=' + this.searchType + '&type=agefilter&datefrom=' + this.datefrom + '&dateto=' + this.dateto + '&levelId=' + this.levelId + '&sitetype=' + this.types + '&limit=' + searchItemPerPage + '&page=' + searchPageNumber).subscribe((res: any) => {
      this.allsearchdata = res.searchData;
      this.eventsDataLength = res.searchData[0]?.eventsData;
      this.articalDataLength = res.searchData[0]?.articlesData;
      this.isfunctionstart = false;
      this.filterBarShowBool = false;
      this.classData = [];
      eventSearchData = [];
      articleSearchdata = [];
      if (this.searchType === 'event') {
        this.articlesData = [];
        eventSearchData = res.searchData[0]?.eventsData;
        this.eventsData.push(...eventSearchData);
      } else {
        this.eventsData = [];
        articleSearchdata = res.searchData[0]?.articlesData; {
          this.articlesData.push(...articleSearchdata);
        }
      }
      if (this.eventsData?.length > 0 || this.articlesData?.length > 0) {
        this.showNotFoundMssg = false;
      } else {
        this.showNotFoundMssg = true;
      }
      // this.groupsearchData = res.searchData[0]?.groupsearchData;
      if (this.groupsearchData) {
        for (let i = 0; i <= this.groupsearchData.length; i++) {
          if (this.joingroupId) {
            if (this.groupsearchData[i]?._id === this.joingroupId) {
              this.groupsearchData[i].select = true;
            } else {
              this.groupsearchData[i].select = false;
            }
          }
          for (let j = 0; j <= this.groupsearchData[i]?.userId.length; j++) {
            if (this.groupsearchData[i].userId[j] === userData?._id) {
              this.groupsearchData[i].select = true;
            } else {
              // this.groupsearchData[i].select = false;
            }
          }
        }
      }
    });
  }

  onScroll(e) {
    if (this.categoryId === undefined) {
      this.categoryId = [];
    }
    if (this.classData?.length > 0 && this.allsearchdata?.length > 0 && !this.filternear && !this.filterloc) {
      this.classPageNumber += 1;
      this.getClassDatabySearch();
    } else {
      if (this.eventsData?.length > 0 || this.articlesData?.length > 0)
        if (this.articalDataLength?.length || this.eventsDataLength?.length > 0) {
          this.eventPageNumber += 1;
          this.articlePageNumber += 1;
          this.SearchALl();
        }
    }
  }


  checkValue(value: any) {
    this.types = "Face to Face";
    this.applyFilterbuttonDisabled = true;
    this.resetClick = true;
    this.locationKey = '';
    if (this.searchValue === 'all' || this.selectype === 'nearme') {
      this.searchValue = '';
      this.categoryId = [];
    }
    if (!this.filternear) {
      this.filternear = true;
      this.siteTypeBool = true;
      this.headingVal = `Search Result Near me classes`
      if (value === 'nearme') {
        if (this.event.userLat !== 0) {
          this.api.get('search?text=' + this.searchValue + '&type=nearme&datefrom=' + this.datefrom + '&dateto=' + this.dateto + '&sitetype=' + this.types + '&lat=' + this.event.userLat + '&long=' + this.event.userlng + '&name=class&levelId=' + this.levelId + '&categoryid=' + this.categoryId + '&page=1&limit=20').subscribe((res: any) => {
            if (res) {
              this.classData = res.searchData[0].nearbyClass;
              if (this.classData.length === 0) {
                this.showNotFoundMssg = true;
              }
              // this.applyFilterbuttonDisabled = false;
              // this.eventsData = res.searchData[0].nearbyevent;
              this.articlesData = [];
              this.groupsearchData = [];
            } else {
              this.getClassDatabySearch();
            }
          });
        } else {
          this.allowLocation = true;
        }
      }
    } else {
      this.filternear = false;
      this.siteTypeBool = false;
      this.types = 'all';
      this.getClassDatabySearch();
    }
  }


  handleAddressChange(address: any) {
    this.siteTypeBool = true;
    this.types = "Face to Face";
    this.filterloc = true;
    this.allowLocation = false;
    this.homeSearchKey = address;
    if (this.selectype === 'location') {
      this.searchValue = '';
      this.categoryId = [];
    }
    this.searchValue = this.searchKey;
    let searchKey = address.name;
    this.headingVal = `Classes within 2 km  of ${searchKey ? searchKey : this.homeSearchKey.name}`
    this.filternear = false;
    this.userAddress = address.formatted_address
    this.userLatitude = address.geometry.location.lat()
    this.userLongitude = address.geometry.location.lng()
    this.api.get('search?text=' + this.searchValue + '&type=location&datefrom=' + this.datefrom + '&dateto=' + this.dateto + '&sitetype=' + this.types + '&lat=' + this.userLatitude + '&long=' + this.userLongitude + '&name=class' + '&levelId=' + this.levelId + '&categoryid=' + this.categoryId + '&page=1&limit=20').subscribe((res: any) => {
      if (res) {
        this.classData = res.searchData[0].nearbyClass;
        // this.eventsData = res.searchData[0].nearbyevent;
        this.articlesData = [];
        this.groupsearchData = [];
      } else {
        this.getClassDatabySearch();
      }
    });
  }

  locationInput() {
    if (this.locationKey?.length === 0) {
      this.siteTypeBool = false;
      this.allowLocation = false;
      this.types = 'all';
    }
    this.filternear = false;
    this.resetClick = true;
    // if (this.locationKey) {
    // }
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

  onKeySearchCategory() {
    this.optionsClasses = this.newOptionsClasses.filter((item) =>
      item?.subcategoryName.toLowerCase().startsWith(this.catSearchKey.toLowerCase()));
  }


  selectAllCategory() {
    this.resetClick = true;
    this.allCatSelectBool = true;
    this.selectedCategoryLevel = [];
    this.selectedCategoryLevel = this.allselectedCatArray;
    this.categoryId = this.allselectedCatArray;
  }

  unSelectAllCategory() {
    this.allCatSelectBool = false;
    this.selectedCategoryLevel = [];
    this.categoryId = [];
  }

  clearSearch() {
    this.searchKey2 = '';
    this.onKeySearchLevel('');
  }

  clearCategorySearch() {
    this.catSearchKey = '';
    this.optionsClasses = this.newOptionsClasses;
  }

  getGroupDetails(id: any) {
    this.router.navigate(["/group-details/" + id]);
  }
  getArticeDetails(id: any) {
    this.router.navigate(["/articles-details/" + id]);
  }
  getEventsDetails(id: any) {
    this.router.navigate(["/event-details/" + id]);
  }

  getClassDetails(id: any) {
    let newID = atob(id);
    this.router.navigate(["/view/class-details/" + newID]);
  }

  checkLoginorNot() {
    if (!this.storage.isLoggednIn()) {
      this.router.navigate(["/login/student"]);
    }
  }

  resetFilter() {
    if (this.resetClick) {
      this.resetClick = false;
      this.showExtraFilters = false;
      this.applyFilterbuttonDisabled = true;
      this.siteTypeBool = false;
      this.filternear = false;
      this.filterloc = false;
      this.allCatSelectBool = false;
      this.isfunctionstart = true;
      this.allowLocation = false;
      if (this.selectype === 'location') {   // removed ==> || this.selectype === undefined condition because search key were getting empty
        this.searchKey = '';
      }
      this.locationKey = '';
      this.selectedOptionsLevels = [];
      this.selectedCategoryLevel = [];
      this.categoryId = [];
      this.levelId = [];
      this.datefrom = 1;
      this.dateto = 18;
      this.agefrom = "0";
      this.ageto = "0";
      // this.searchValue = 'all'
      this.types = 'all';
      // this.event.searchType = 'all';
      // this.event.AgeFromSearch = '0';
      // this.event.AgetoSearch = '0';
      this.classPageNumber = 1;
      this.classData = [];
      if (this.types === 'Online') {
        this.nearme = '';
        this.filternear = false;
      }
      // this.event.searchType = this.types;
      this.selectype = this.types;
      // this.changesiteType();
      this.headingVal = 'Search Result of Classes'
      if (this.searchKey.trim() !== '' && this.searchKey.length > 3) {
        this.getClassDatabySearch();
      } else {
        this.classData = [];
      }
    }
  }

  joinGroup(groupData: any) {
    this.checkLoginorNot();
    let requestData = {};
    this.joingroupId = groupData?._id;
    this.type = 'join';
    requestData['groupId'] = groupData?._id;
    requestData['type'] = 'join';
    this.api.post('joingroups', requestData).subscribe((res: any) => {
      if (res.status == true) {
        this.api.alert(res.message, 'success');
        this.SearchALl();
        for (let i = 0; i <= this.groupsearchData.length; i++) {
          if (this.groupsearchData[i]?._id === groupData?._id) {
            this.groupsearchData[i].select = true;
          } else {
            this.groupsearchData[i].select = false;
          }
        }
      } else {
        this.api.alert(res.message, 'error');
      }
    });
  }

  back() {
    this.event.back();
  }

}