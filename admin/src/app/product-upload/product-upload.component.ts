import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-upload',
  templateUrl: './product-upload.component.html',
  styleUrls: ['./product-upload.component.css']
})
export class ProductUploadComponent {

  product: any = {};

  selectedImage: File | null = null;

  constructor(private http: HttpClient){}

  onFileChange(event:any){
    this.selectedImage = event.target.files[0];
  }

  uploadProduct() {

    if(!this.selectedImage) return;

    this.product.imageUrl = this.selectedImage;

    const formData = new FormData();

    formData.append('name', this.product.name);
    formData.append('description', this.product.description);
    formData.append('price', this.product.price);
    formData.append('category', this.product.category);
    formData.append('stock', this.product.stock);
    formData.append('image', this.product.imageUrl);

    this.http.post('http://localhost:3000/product/new-product', formData).subscribe(
      res=>console.log('Upload Success:',res),
      err=>console.error('Upload Failed:',err)
    );
  }

}
