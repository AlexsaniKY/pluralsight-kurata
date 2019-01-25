import {Component} from '@angular/core';
import * as PRODUCTS from '../../api/products/products.json';

//strongly typed allows html autocompletion to assist, DOES NOT PROTECT AGAINST A MALFORMED JSON
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
    listFilter: string= 'cart';

    togglePictures(): void{
        this.showPictures = !this.showPictures;
    }
}