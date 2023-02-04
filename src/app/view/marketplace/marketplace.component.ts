

//by Harshit jain for Marketplace product.

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss']
})
export class MarketplaceComponent implements OnInit {
  panelOpenState = false;
  pCategories: any;
  allProducts: any = [];
  newProduct: any = [];
  usedProduct: any = [];
  freeProduct: any = [];
  category: any;
  newProducts: any = [];
  searchvalue: any;
  allCategories: any = [];
  newallCategory: any;
  RepetedCategory: any = [];
  newcategoryArray: any = [];
  usedProductdata: any;
  filterValue: any;
  newUsedProductdata: any = [];
  newNewProductdata: any = [];
  newFreeProductdata: any = [];
  newNewProduct: any = [];
  productWishlisteddata: any = [];
  newWishlostProduct: any = [];
  subcategoryValue: any;
  itemperpage: number = 4;
  redirectCategpagenumber: number = 1;
  searchCategoryByName: any;
  productsPageNumber: number = 1;
  isproductData: boolean = false;;

  constructor(private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: StorageService
  ) {
    this.route.params.subscribe((params) => {
      this.category = params['Category'];
      this.getWishlist();
      this.getMarketplaceProduct();
    });
  }

  ngOnInit(): void {
    this.getProductCategories();
    // this.getWishlist();
  }


  onTabClick(event) {
    this.filterValue = event.tab.textLabel;
    //console.log(this.filterValue);
    // if (this.filterValue = 'All Products') {
    //   this.allProductData();
    // }
    this.searchAllproducts();
    if (this.category && this.category.trim() !== '') {
      this.getMarketplaceProduct();
    }
  }

  getProductCategories() {
    this.api.get("getproductCategory").subscribe((res: any) => {
      this.pCategories = res.CategoryData;
    });
  }

  getMarketplaceProduct() {
    if (this.category && this.category.trim() !== '') {
      this.api.get("searchontype?type=product&selectedName=" + this.category).subscribe((res: any) => {
        // this.allProducts = res.data;
        this.newProducts = res.data;

      });
    } else {  
     this.allProductData();
     this.allUsedProduct();
     this.allNewProduct();
     this.allFreeProduct();
    }
  }
    getCategoryinProductData() {
      this.newProducts.forEach((element: any) => {
        element.categoryId.forEach(elem => {
          this.allCategories.push(elem.categoryName);
        });
      });
      let newCategory = [];
      newCategory = [...new Set(this.allCategories)];
      this.RepetedCategory = newCategory.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
   
      this.newcategoryArray = this.RepetedCategory;
    }

    searchCategoryByKey(): void {
      let term = this.searchCategoryByName;
      this.RepetedCategory = this.newcategoryArray.filter(function (tag) {
        return tag.toLowerCase().indexOf(term.toLowerCase()) >= 0;
      });
    }

  allProductData() {
    this.api.get('getproducts?limit=' + this.itemperpage + '&page=' + this.productsPageNumber).subscribe((res: any) => {
      this.allProducts = res.productsData;
      this.newProducts.push(...res.productsData);
      // this.isproductData = true;
      this.getCategoryinProductData();
      this.getWishlist();
    });
  }
  

  allUsedProduct() {
    this.api.get("getproducts?limit=10&page=1&type=used").subscribe((res: any) => {
      this.usedProductdata = res.productsData;
      this.newUsedProductdata = this.usedProductdata;
      this.getCategoryinProductData();
      this.getWishlist();
      //console.log(this.usedProductdata, "usedproductdata");
    });
  }

  allNewProduct() {
    this.api.get("getproducts?limit=50&page=0&type=new").subscribe((res: any) => {
      this.newProduct = res.productsData;
      this.newNewProductdata = this.newProduct;
      // this.newProducts = this.allProducts;
      this.getCategoryinProductData();
      this.getWishlist();
      //console.log(this.newProduct, "newproductdata");
    });
  }

  allFreeProduct() {
    this.api.get("getproducts?limit=50&page=0&type=free").subscribe((res: any) => {
      this.freeProduct = res.productsData;
      this.newFreeProductdata = this.freeProduct;
      this.getCategoryinProductData();
      this.getWishlist();
      //console.log(this.freeProduct, "freeroductdata");
    });
  }




  // productFilters() {
  //   for (var i = 0; i < this.newProducts.length; i++) {
  //     if (this.newProducts[i].condition === 'new') {
  //       this.usedProductdata.push(this.newProducts[i]);
  //     }
  //   }
  //   for (var i = 0; i < this.newProducts.length; i++) {
  //     if (this.newProducts[i].condition === 'used') {
  //       this.newProduct.push(this.newProducts[i]);
  //     }
  //   }
  //   for (var i = 0; i < this.newProducts.length; i++) {
  //     if (this.newProducts[i].price === 'forfree') {
  //       this.freeProduct.push(this.newProducts[i]);
  //     }
  //   }
  // }

  searchAllproducts() {
    if (this.category && this.searchvalue && this.searchvalue.trim() !== '') {
      this.api.get("searchontype?type=product&selectedName=" + this.category + '&filtervalue="' + this.filterValue + '&text=' + this.searchvalue).subscribe((res: any) => {
        if (this.filterValue === 'Used Products') {
          this.newUsedProductdata = res.data;
        } else if (this.filterValue === 'New Products') {
          this.newNewProduct = res.data;
        } else if (this.filterValue === 'Free Products') {
          this.newFreeProductdata = res.data;
        } else {
          this.newProducts = res.data;
        }
      });
    } else if (this.searchvalue && this.searchvalue.trim() !== '') {
      this.api.get("searchontype?type=product&selectedName=&filtervalue=" + this.filterValue + '&text=' + this.searchvalue).subscribe((res: any) => {
        if (this.filterValue === 'Used Products') {
          this.newUsedProductdata = res.data;
        } else if (this.filterValue === 'New Products') {
          this.newNewProduct = res.data;
        } else if (this.filterValue === 'Free Products') {
          this.newFreeProductdata = res.data;
        } else {
          this.newProducts = res.data;
        }
      //  this.productFilters();
      });
    } else {
      this.newProducts = [];
      this.newUsedProductdata = [];
      this.newNewProduct = [];
      this.newFreeProductdata = [];
      this.newUsedProductdata = this.usedProductdata;
      this.newNewProduct = this.newProduct;
      this.newFreeProductdata = this.freeProduct;
      this.newProducts = this.allProducts;
    }
  }
  SearchbyCategory(value: any) {
    if (value) {
      this.subcategoryValue = value;
      this.api.get("searchontype?type=product&selectedName=" + value   + '&limit=' + this.itemperpage + '&page=' + this.redirectCategpagenumber).subscribe((res: any) => {
        this.allProducts = res.data;
        this.newProducts = this.allProducts;
      });
    }
  }

  getWishlist() {
    const userData = JSON.parse(localStorage.getItem('userdata'));
    this.api.get('getWishlist?type=wishlisted&Objecttype=products').subscribe((res: any) => {
      //console.log(res.wishlistedData);
      this.productWishlisteddata = res.wishlistedData;
      for(let i = 0; i < this.productWishlisteddata.length; i++) {
         if (this.productWishlisteddata[i].userId?._id === userData?._id) {
           this.newProducts.forEach(element => {
             if(element._id === this.productWishlisteddata[i]?.wishlistedId) {
               element.selected = true;
             }
           });
           this.newUsedProductdata.forEach(element => {
            if(element._id === this.productWishlisteddata[i]?.wishlistedId) {
              element.selected = true;
            }
          });
          this.newNewProduct.forEach(element => {
            if(element._id === this.productWishlisteddata[i]?.wishlistedId) {
              element.selected = true;
            }
          });
          this.newFreeProductdata.forEach(element => {
            if(element?._id === this.productWishlisteddata[i]?.wishlistedId) {
              element.selected = true;
            }
          });
         }
      }
    });
  }


 addtoProductWishList(classId: any) {
  if (this.storage.isLoggednIn()) {
    let requestData = {};
    this.newWishlostProduct = [...this.newProducts , ...this.newNewProduct, ...this.newFreeProductdata , ...this.newUsedProductdata];
    for(let i = 0; i <= this.newWishlostProduct.length; i++) {
       if (this.newWishlostProduct[i]?._id === classId) {
        this.newWishlostProduct[i].selected = true;
        this.api.alert('Added to your Shortlist', 'success');
       }
    //  } else {
    //   this.newWishlostProduct[i].selected = false;
    //   this.api.alert('Remove to wishlist', 'error');
    // }
  } 
   
    requestData["type"] = 'products';
    requestData["wishlistedId"] = classId;
 
    this.api.post('addwishlist', requestData).subscribe((res: any) => {
      const favAdded = res.message;
    
    });
  } else {
    this.router.navigate(['/login/student']);
  }
  }

 deleteProductWishlist( classId: any) {
  if (this.storage.isLoggednIn()) {
  for(let i = 0; i <= this.newWishlostProduct.length; i++) {
     if (this.newWishlostProduct[i]?._id === classId) {
      this.newWishlostProduct[i].selected = false;
      this.api.alert('Removed to wishlist', 'success');
     }
  //  } else {
  //   this.newWishlostProduct[i].selected = true;
  //   // this.api.alert('Add to wishlist', 'error');
  // }
  }
    let requestData = {};
    requestData["wishlistedId"] = classId;
    
    this.api.post('deletedwishlistitem', requestData).subscribe((res: any) => {
      const favAdded = res.message;
    });
  } else {
    this.router.navigate(['/login/student']);
  }
  }


  resetbyTag() {
    this.subcategoryValue = '';
    this.searchCategoryByName = '';
    if (this.category) {
      this.router.navigate(["/view/marketplace/"]);
    }
    this.productsPageNumber = 1;
    this.allProductData();
  }

  redirectToMarketplaceDetails(id: any) {
    this.router.navigate(["/view/marketplace-details/" + id]);
  }

  onScroll(e) {
    if (this.isproductData) {
      //console.log(e);
      this.productsPageNumber += 1;
      this.allProductData(); 
    //  this.allUsedProduct();
    //  this.allNewProduct();
    //  this.allFreeProduct();
  }

    }
}
