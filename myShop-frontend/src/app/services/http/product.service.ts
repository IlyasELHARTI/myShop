import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { AppConfig } from '../core/appconfig.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // private baseUrl = 'http://localhost:4200/api/products';
  private baseUrl = `${this.appConfig.getConfig().apiURL}/products`

  constructor(private httpClient : HttpClient, private appConfig : AppConfig) { }


  getProductList() : Observable<Product[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(resposne => resposne._embedded.products)
    );
  }
}

interface GetResponse {
  _embedded: {
    products : Product[];
  }
}