import {Component} from '@angular/core';
import * as PRODUCTS from '../../api/products/products.json';

interface ProductDefinition{
    productId: number;
    productName: string;
    productCode: string;
    releaseDate: string;
    description: string;
    price: number;
    starRating: number;
    imageUrl: string;
}

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
})
export class ProductListComponent{
    pageTitle: string = 'Product List';
    imageWidth:number = 50;
    imageMargin:number = 50;
    products: ProductDefinition[] = <ProductDefinition[]> PRODUCTS.default;
    showPictures: boolean = true;

    togglePictures(): void{
        this.showPictures = !this.showPictures;
    }
}