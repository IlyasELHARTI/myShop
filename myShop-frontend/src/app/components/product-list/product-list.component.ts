import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/http/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;  
  thePreviousKeyword: string;
  searchMode: boolean = false;

  //new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  constructor(private productService : ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() =>{
    this.listProducts()
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleListProducts() {
    
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    } else {
      this.currentCategoryId = 1
    }

    //
    // Check if we have a different category than previous
    // Note: Angular will reuse a component if it is currently being viewed
    //

    // if we have a different category id than previous
    // then set thePageNumber back to 1

    if(this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    this.productService.getProductList(this.currentCategoryId, this.thePageNumber - 1, this.thePageSize).subscribe(
      data => {
        this.products = data._embedded.products;
        this.theTotalElements = data.page.totalElements
      }
    );
  }

  handleSearchProducts() {
    
    const theKeyword = this.route.snapshot.paramMap.get('keyword');

    if(this.thePreviousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }

    this.thePreviousKeyword = theKeyword;
    
    this.productService.getProductListByName(theKeyword, this.thePageNumber - 1, this.thePageSize).subscribe(
      data => {
        this.products = data._embedded.products;
        this.theTotalElements = data.page.totalElements
      }
    );
  }

  updatePageSize(pageSize: string) {
    this.thePageSize = +pageSize
    this.thePageNumber = 1;
    this.listProducts();
  }
}
