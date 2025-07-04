import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/http/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {



  constructor(private router : Router) { }

  ngOnInit(): void {
  }
  
  doSearch(value: string) {
    this.router.navigateByUrl(`/search/${value}`)
  }
  
}
