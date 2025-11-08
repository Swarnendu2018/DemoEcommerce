import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit{

  data: any[] = [];

  constructor (private dataService: ProductService)  {}

  ngOnInit(): void {
    this.dataService.getData().subscribe((res: any) => {
      console.log(res);
      this.data = res;
    });
  }
}
