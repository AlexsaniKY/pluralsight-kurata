import {Component} from '@angular/core';
import * as PRODUCTS from '../../api/products/products.json';

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
})
export class ProductListComponent{
    pageTitle: string = 'Product List';
    products: object[] = PRODUCTS.default;

}