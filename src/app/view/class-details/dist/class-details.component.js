"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClassDetailsComponent = void 0;
var core_1 = require("@angular/core");
var ClassDetailsComponent = /** @class */ (function () {
    function ClassDetailsComponent(api, router, route, storage, event, location) {
        var _this = this;
        this.api = api;
        this.router = router;
        this.route = route;
        this.storage = storage;
        this.event = event;
        this.location = location;
        this.panelOpenState = false;
        this.branchName = [];
        this.branchDetails = [];
        this.sectionData = [];
        this.sections = [];
        this.hideclass = true;
        this.allreviews = [];
        this.stars = [1, 2, 3, 4, 5];
        this.showAddreview = true;
        this.replyBox = false;
        this.showreplyReview = false;
        this.favItem = false;
        this.ischatButton = true;
        this.selectedIndex = 0;
        this.isHidden = true;
        this.isAddreview = false;
        this.locationchoosen = false;
        this.isSelected = false;
        this.alltags = [];
        this.classTags = [];
        this.isbranchSelected = false;
        this.customOptions = {
            loop: true,
            mouseDrag: true,
            touchDrag: true,
            pullDrag: true,
            dots: false,
            autoplay: true,
            navSpeed: 700,
            //autoplayTimeout:2000,
            //autoplaySpeed: 1500,
            navText: ["", ""],
            responsive: {
                0: {
                    items: 1
                },
                400: {
                    items: 1
                },
                740: {
                    items: 1
                },
                940: {
                    items: 1
                }
            },
            nav: false
        };
        this.customOptions2 = {
            loop: true,
            mouseDrag: true,
            touchDrag: true,
            pullDrag: true,
            dots: false,
            autoplay: true,
            navSpeed: 700,
            //autoplayTimeout:2000,
            //autoplaySpeed: 1500,
            navText: ["", ""],
            responsive: {
                0: {
                    items: 2
                },
                400: {
                    items: 3
                },
                740: {
                    items: 3
                },
                940: {
                    items: 4
                }
            },
            nav: false
        };
        this.route.params.subscribe(function (params) {
            var encodedId = params['id'];
            // this.branch =  params["branchName"];
            _this.id = btoa(encodedId);
            _this.getallClassDetails();
            _this.getbranchListing();
            _this.getSection();
            _this.getAllreview();
        });
    }
    ClassDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.selectedIndex = this.event.indexSelected;
        var userData = JSON.parse(localStorage.getItem('userdata'));
        this.userId = userData === null || userData === void 0 ? void 0 : userData._id;
        if ((userData === null || userData === void 0 ? void 0 : userData.type) !== "student") {
            var classData = JSON.parse(localStorage.getItem('classData'));
            if ((classData === null || classData === void 0 ? void 0 : classData._id) === this.id) {
                this.showAddreview = false;
            }
        }
        if (this.event.selectedBranch) {
            this.isSelected = true;
            this.selectedIndex = 1;
            this.branchID = this.event.selectedBranch;
            this.branchSelected = this.event.selectedBranch;
            this.api.get('branchlist?classId=' + this.id).subscribe(function (res) {
                _this.branchDetails = res.branchData;
                _this.branchDetails.forEach(function (branch) {
                    var _a, _b;
                    if (branch._id === _this.event.selectedBranch) {
                        _this.branchname = branch === null || branch === void 0 ? void 0 : branch.branchName;
                        _this.address = branch === null || branch === void 0 ? void 0 : branch.address1;
                        _this.branchAdminEmail = branch === null || branch === void 0 ? void 0 : branch.email;
                        _this.mobileNo = branch === null || branch === void 0 ? void 0 : branch.businessmobileNo;
                        _this.email = branch === null || branch === void 0 ? void 0 : branch.businessemail;
                        _this.webAddress = branch === null || branch === void 0 ? void 0 : branch.webAddress;
                        _this.branchstatus = branch === null || branch === void 0 ? void 0 : branch.branchstatus;
                        if (_this.branchstatus === 'offline') {
                            _this.lat = (_a = branch === null || branch === void 0 ? void 0 : branch.loc) === null || _a === void 0 ? void 0 : _a.coordinates[1];
                            _this.lng = (_b = branch === null || branch === void 0 ? void 0 : branch.loc) === null || _b === void 0 ? void 0 : _b.coordinates[0];
                            _this.zoomValue = 18;
                        }
                        else {
                            _this.lat = 1.3521;
                            _this.lng = 103.8198;
                            _this.zoomValue = 9;
                        }
                        _this.getallClassDetails();
                        // console.log(this.lat + "latlong" + this.lng);
                    }
                    // this.event.selectedBranch = ''
                });
            });
        }
    };
    ClassDetailsComponent.prototype.mapClicked = function (event) {
        // console.log(event);
        // this.lat = event.coords.latitude;
        // this.lng = event.coords.longitude;
        this.locationchoosen = true;
    };
    ClassDetailsComponent.prototype.getSection = function () {
        var _this = this;
        this.api.get("classdetailsection?classId=" + this.id).subscribe(function (res) {
            _this.sectionData = res.description;
            // console.log("sectiondata", this.sectionData);
            // this.sectionData.forEach((item: any) => {
            //   this.sections.push({ sectionname: item.sectionname, title: item.title, sectionValue: item.section })
            // })
            // console.log("section", this.sections);
        });
    };
    ClassDetailsComponent.prototype.getWishlist = function () {
        var _this = this;
        var userData = JSON.parse(localStorage.getItem('userdata'));
        this.api.get('getWishlist?type=wishlisted&Objecttype=classes').subscribe(function (res) {
            var _a, _b, _c;
            // console.log(res.wishlistedData);
            _this.wishlisteddata = res.wishlistedData;
            for (var i = 0; i < _this.wishlisteddata.length; i++) {
                if (((_a = _this.wishlisteddata[i].userId) === null || _a === void 0 ? void 0 : _a._id) === (userData === null || userData === void 0 ? void 0 : userData._id)) {
                    if (((_b = _this.allClassDetails) === null || _b === void 0 ? void 0 : _b._id) === ((_c = _this.wishlisteddata[i]) === null || _c === void 0 ? void 0 : _c.wishlistedId)) {
                        _this.favItem = true;
                    }
                }
                else {
                    _this.favItem = false;
                }
            }
        });
    };
    ClassDetailsComponent.prototype.addtoClassWishList = function (classId) {
        var _this = this;
        this.favItem = true;
        var requestData = {};
        requestData["type"] = 'classes';
        requestData["wishlistedId"] = classId;
        if (this.storage.isLoggednIn()) {
            this.api.post('addwishlist', requestData).subscribe(function (res) {
                var favAdded = res.message;
                // if (favAdded === "Added to your wishlist successfully") {
                if (res.status) {
                    _this.api.alert('Added to Shortlist', 'success');
                }
                // } else {
                //   this.favItem = false;
                //   // this.api.alert('Remove to wishlist', 'error');
                // }
            });
        }
        else {
            this.router.navigate(["/login/student"]);
        }
    };
    ClassDetailsComponent.prototype.deleteClassWishlist = function (classId) {
        var _this = this;
        this.favItem = false;
        var requestData = {};
        requestData["wishlistedId"] = classId;
        if (this.storage.isLoggednIn()) {
            this.api.post('deletedwishlistitem', requestData).subscribe(function (res) {
                var favAdded = res.message;
                if (res.status) {
                    _this.api.alert('Removed from Shortlist', 'success');
                }
                //  else {
                // //   this.favItem = true;
                //   // this.api.alert('Remove to wishlist', 'error');
                // // }
            });
        }
        else {
            this.router.navigate(["/login/student"]);
        }
    };
    ClassDetailsComponent.prototype.searchData = function (value) {
        this.router.navigate(['view/class-list/' + this.id + '/' + value]);
        // console.log('tags', value);
    };
    ClassDetailsComponent.prototype.countStar = function (star) {
        this.selectedValue = star;
    };
    ClassDetailsComponent.prototype.reviewReply = function (id) {
        this.replyBox = !this.replyBox;
        this.reveiewId = id;
        this.showreplyReview = !this.showreplyReview;
    };
    ClassDetailsComponent.prototype.copyToClipboard = function () {
        if (this.storage.isLoggednIn()) {
            this.event.copyClipboard();
            this.api.alert('Link Copied', 'success');
        }
    };
    ClassDetailsComponent.prototype.getallClassDetails = function () {
        var _this = this;
        this.isHidden = false;
        this.api.get("classDetails?classId=" + this.id + '&branchId=' + this.branchID).subscribe(function (res) {
            var _a;
            _this.allData = res;
            _this.allClassDetails = res.classData;
            _this.classuserId = (_a = _this.allClassDetails) === null || _a === void 0 ? void 0 : _a.admin_id;
            _this.classdataSize = Object.keys(_this.allClassDetails).length;
            if (_this.userId === _this.classuserId) {
                _this.ischatButton = true;
            }
            else {
                _this.ischatButton = false;
            }
            if (_this.storage.isLoggednIn()) {
                _this.getWishlist();
            }
        });
        if (!this.isbranchSelected) {
            this.getPublicTags();
        }
    };
    ClassDetailsComponent.prototype.getPublicTags = function () {
        var _this = this;
        this.classTags = [];
        this.api.get('gettag').subscribe(function (res) {
            _this.alltags = res.tagData;
            _this.alltags.forEach(function (element) {
                var _a;
                (_a = _this.allClassDetails) === null || _a === void 0 ? void 0 : _a.tags.filter(function (tags) {
                    if (element.tags === tags) {
                        if (element.status == true) {
                            _this.classTags.push(element.tags);
                        }
                    }
                });
            });
            console.log(_this.classTags, "classTags");
        });
    };
    ClassDetailsComponent.prototype.chatToBusiness = function () {
        var classId = 'classId';
        if (this.branchAdminEmail && this.classdataSize > 0) {
            this.router.navigate(["/pages/chat/" + this.branchID]);
        }
        else if (this.classdataSize > 0) {
            this.router.navigate(["/pages/chat/" + this.classuserId]);
        }
        else {
            this.router.navigate(["/pages/chat/" + this.userId]);
        }
    };
    ClassDetailsComponent.prototype.getbranchListing = function () {
        var _this = this;
        if (!this.isSelected) {
            this.api.get('branchlist?classId=' + this.id).subscribe(function (res) {
                var _a, _b, _c, _d, _e, _f;
                _this.branchDetails = res.branchData;
                // console.log(this.branchDetails);
                _this.branchID = (_a = _this.branchDetails[0]) === null || _a === void 0 ? void 0 : _a._id;
                _this.branchname = (_b = _this.branchDetails[0]) === null || _b === void 0 ? void 0 : _b.branchName;
                _this.address = _this.branchDetails[0].address1;
                _this.moreaddress = _this.branchDetails[0].address2;
                _this.postalcode = _this.branchDetails[0].postalCode;
                _this.country = _this.branchDetails[0].country;
                _this.mobileNo = _this.branchDetails[0].businessmobileNo;
                _this.email = _this.branchDetails[0].businessemail;
                _this.branchAdminEmail = _this.branchDetails[0].email;
                _this.webAddress = _this.branchDetails[0].webAddress;
                _this.branchstatus = _this.branchDetails[0].branchstatus;
                if (_this.branchstatus === 'offline') {
                    _this.lat = (_d = (_c = _this.branchDetails[0]) === null || _c === void 0 ? void 0 : _c.loc) === null || _d === void 0 ? void 0 : _d.coordinates[1];
                    _this.lng = (_f = (_e = _this.branchDetails[0]) === null || _e === void 0 ? void 0 : _e.loc) === null || _f === void 0 ? void 0 : _f.coordinates[0];
                    _this.zoomValue = 18;
                }
                else {
                    _this.lat = 1.3521;
                    _this.lng = 103.8198;
                    _this.zoomValue = 9;
                }
                // console.log(this.lat + "latlong" + this.lng);
                // this.branchName = this.branchDetails.map((item) => {
                //   return { value: item.branchName, branchId: item._id };
                // });
            });
            this.getallClassDetails();
            this.getAllreview();
        }
    };
    ClassDetailsComponent.prototype.selectBranch = function (event) {
        var _this = this;
        this.isbranchSelected = true;
        this.event.selectedBranch = event;
        this.branchID = event;
        this.branchDetails.forEach(function (branch) {
            var _a, _b;
            if (branch._id === event) {
                _this.branchname = branch === null || branch === void 0 ? void 0 : branch.branchName;
                _this.address = branch === null || branch === void 0 ? void 0 : branch.address1;
                _this.moreaddress = branch.address2;
                _this.postalcode = branch.postalCode;
                _this.country = branch.country;
                _this.branchAdminEmail = branch === null || branch === void 0 ? void 0 : branch.email;
                _this.mobileNo = branch === null || branch === void 0 ? void 0 : branch.businessmobileNo;
                _this.email = branch === null || branch === void 0 ? void 0 : branch.businessemail;
                _this.webAddress = branch === null || branch === void 0 ? void 0 : branch.webAddress;
                _this.branchstatus = branch === null || branch === void 0 ? void 0 : branch.branchstatus;
                if (_this.branchstatus === 'offline') {
                    _this.lat = (_a = branch === null || branch === void 0 ? void 0 : branch.loc) === null || _a === void 0 ? void 0 : _a.coordinates[1];
                    _this.lng = (_b = branch === null || branch === void 0 ? void 0 : branch.loc) === null || _b === void 0 ? void 0 : _b.coordinates[0];
                    _this.zoomValue = 18;
                }
                else {
                    _this.lat = 1.3521;
                    _this.lng = 103.8198;
                    _this.zoomValue = 9;
                }
                // console.log(this.lat + "latlong" + this.lng);
            }
        });
        // console.log(this.branchname);
        this.getallClassDetails();
    };
    ClassDetailsComponent.prototype.getAllreview = function () {
        var _this = this;
        this.api.get('getreview?classId=' + this.id).subscribe(function (res) {
            _this.allreviews = res.data;
            // console.log(this.allreviews, "allreviews");
        });
    };
    ClassDetailsComponent.prototype.showAboutClass = function () {
        this.hideclass = !this.hideclass;
    };
    ClassDetailsComponent.prototype.checkLoginorNot = function () {
        if (!this.storage.isLoggednIn()) {
            this.router.navigate(["/login/student"]);
        }
    };
    ClassDetailsComponent.prototype.back = function () {
        this.location.back();
    };
    ClassDetailsComponent.prototype.SendReply = function (id) {
        var _this = this;
        this.ReviewId = id;
        var requestdata = {};
        requestdata['reviewId'] = this.ReviewId;
        requestdata['replyreview'] = { review: this.replyvalue };
        this.api.post('replyreview', requestdata).subscribe(function (res) {
            if (res && res.status == true) {
                _this.replyvalue = '';
                _this.getAllreview();
            }
            _this.showreplyReview = true;
            _this.replyBox = false;
        });
    };
    ClassDetailsComponent.prototype.selectedTabChange = function (tabVal) {
        this.event.indexSelected = tabVal.index;
        // console.log('tab changrd', tabVal.index);
    };
    ClassDetailsComponent.prototype.showMoreData = function (sectiontitle) {
        var DetailType = 'forclassess';
        this.router.navigate(["/group/Related-More/" + DetailType + '/' + this.id + '/' + sectiontitle]);
    };
    ClassDetailsComponent.prototype.getArticeDetails = function (id) {
        this.router.navigate(["/group/articles-details/" + id]);
    };
    ClassDetailsComponent.prototype.getGroupDetails = function (id) {
        this.router.navigate(["/group/group-details/" + id]);
    };
    ClassDetailsComponent.prototype.getEventsDetails = function (id) {
        this.router.navigate(["/group/event-details/" + id]);
    };
    ClassDetailsComponent.prototype.getClassDetails = function (id) {
        var newId = atob(id);
        this.isSelected = false;
        this.event.selectedBranch = '';
        this.router.navigate(["/view/class-details/" + newId]);
    };
    ClassDetailsComponent.prototype.redirectToMarketplaceDetails = function (id) {
        this.router.navigate(["/view/marketplace-details/" + id]);
    };
    ClassDetailsComponent.prototype.redirectToaddreview = function () {
        this.router.navigate(["/pages/add-review/" + this.id + '/' + this.branchname]);
    };
    __decorate([
        core_1.ViewChild('tabs', { static: false })
    ], ClassDetailsComponent.prototype, "tabs");
    ClassDetailsComponent = __decorate([
        core_1.Component({
            selector: "app-class-details",
            templateUrl: "./class-details.component.html",
            styleUrls: ["./class-details.component.scss"]
        })
    ], ClassDetailsComponent);
    return ClassDetailsComponent;
}());
exports.ClassDetailsComponent = ClassDetailsComponent;
