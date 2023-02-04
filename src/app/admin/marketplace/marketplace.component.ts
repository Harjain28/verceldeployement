

//by Harshit jain for Marketplace product.

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

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
  newNewProduct: any;
  API_URL: any;

  constructor(private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.API_URL = environment.BASE_API_ENDPOINT;
    this.route.params.subscribe((params) => {
      this.category = params['Category'];
      this.getMarketplaceProduct();
    });
  }

  ngOnInit(): void {
    this.getProductCategories();
  }


  onTabClick(event) {
    this.filterValue = event.tab.textLabel;
    //console.log(this.filterValue);
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
      this.RepetedCategory = [...new Set(this.allCategories)];
      this.newcategoryArray = this.RepetedCategory;
    }

  allProductData() {
    this.api.get("getproducts?limit=50&page=0").subscribe((res: any) => {
      this.allProducts = res.productsData;
      this.newProducts = this.allProducts;
      this.getCategoryinProductData();
    });
  }

  allUsedProduct() {
    this.api.get("getproducts?limit=50&page=0&type=used").subscribe((res: any) => {
      this.usedProductdata = res.productsData;
      this.newUsedProductdata = this.usedProductdata;
      this.getCategoryinProductData();
      //console.log(this.usedProductdata, "usedproductdata");
    });
  }

  allNewProduct() {
    this.api.get("getproducts?limit=50&page=0&type=new").subscribe((res: any) => {
      this.newProduct = res.productsData;
      this.newNewProductdata = this.newProduct;
      // this.newProducts = this.allProducts;
      this.getCategoryinProductData();
      //console.log(this.newProduct, "newproductdata");
    });
  }

  allFreeProduct() {
    this.api.get("getproducts?limit=50&page=0&type=free").subscribe((res: any) => {
      this.freeProduct = res.productsData;
      this.newFreeProductdata = this.freeProduct;
      this.getCategoryinProductData();
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
      this.api.get("searchontype?type=product&selectedName=" + value).subscribe((res: any) => {
        this.allProducts = res.data;
        this.newProducts = this.allProducts;
      });
    }
  }

  resetbyTag() {
    this.allProductData();
  }

  redirectToMarketplaceDetails(id: any) {
    this.router.navigate(["/view/marketplace-details/" + id]);
  }
}
