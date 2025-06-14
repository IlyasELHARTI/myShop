import { RouterModule, Routes } from "@angular/router";
import { ProductListComponent } from "./components/product-list/product-list.component";
import { NgModule } from "@angular/core";
import { ProductDetailsComponent } from "./components/product-details/product-details.component";

const routes : Routes = [
    {path: "category/:id", component: ProductListComponent },
    {path: "category", component: ProductListComponent},
    {path: "products", component: ProductListComponent},
    {path: "search/:keyword", component: ProductListComponent},
    {path: "products/:id", component: ProductDetailsComponent},
    {path: " ", redirectTo: "/products", pathMatch: "full"},
    {path: "**", redirectTo: "/products", pathMatch: "full"},
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }