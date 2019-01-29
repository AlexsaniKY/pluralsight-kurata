import { Injectable } from '@angular/core';
import { IProductDefinition, PRODUCTS } from './product-definitions';
import {randomNumber, randomDate} from '../../helpers/random';

@Injectable({
    providedIn: 'root',
})
export class ProductService{

    lastId:number = 100;
    randomProduct(): IProductDefinition{
        this.lastId++;
        return {
            productId: this.lastId,
            productName: "new",
            productCode: "NEW-" + Math.floor(randomNumber(1000,9999)),
            releaseDate: randomDate(new Date("2015"), new Date()),
            description: "a random new product",
            price: Math.floor(randomNumber(.99, 100)*100)/100,
            starRating:randomNumber(0.0001, 5),
            imageUrl: ""
        };

    }

    getProducts(): IProductDefinition[] {
        return PRODUCTS;
    }
}