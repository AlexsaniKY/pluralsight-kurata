import { Injectable } from '@angular/core';
import { IProductDefinition, PRODUCTS } from './product-definitions';

@Injectable({
    providedIn: 'root',
})
export class ProductService{

    getProducts(): IProductDefinition[] {
        return PRODUCTS;
    }
}