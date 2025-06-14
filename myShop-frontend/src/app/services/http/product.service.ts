import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig } from '../core/appconfig.service';
import { ProductCategory } from 'src/app/common/product-category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // private baseUrl = 'http://localhost:4200/api/products';
  private baseUrl = `${this.appConfig.getConfig().apiURL}`;

  constructor(private httpClient: HttpClient, private appConfig: AppConfig) {}

  getProductList(categoryId: number): Observable<Product[]> {
    const url = `${this.baseUrl}/products/search/findByCategoryId?id=${categoryId}`;
    return this.httpClient
      .get<GetResponse>(url)
      .pipe(map((resposne) => resposne._embedded.products));
  }

  getProductCategoriesList(): Observable<ProductCategory[]> {
    const url = `${this.baseUrl}/product-category`;
    return this.httpClient
      .get<GetResponseProductCategory>(url)
      .pipe(map((response) => response._embedded.productCategory));
  }

  getProductListByName(name: string): Observable<Product[]> {
    const url = `${this.baseUrl}/products/search/findByNameContaining?name=${name}`;
    return this.httpClient
      .get<GetResponse>(url)
      .pipe(map((resposne) => resposne._embedded.products));
  }

  getProduct(theProductId: number) {

    const url = `${this.baseUrl}/products/${theProductId}`

    return this.httpClient.get<Product>(url);
  }
}

interface GetResponse {
  _embedded: {
    products: Product[];
  };
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
