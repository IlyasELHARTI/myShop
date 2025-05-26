import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/http/product.service';
import { CoreServiceModule } from './services/core/core-service.module';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreServiceModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
