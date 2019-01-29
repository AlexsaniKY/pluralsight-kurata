import { Injectable } from '@angular/core';
import { IProductDefinition, PRODUCTS } from './product-definitions';

@Injectable()
export class ProductService{

    getProducts(): IProductDefinition[] {
        return PRODUCTS;
    }
}