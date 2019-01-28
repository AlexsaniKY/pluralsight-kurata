import {Component} from '@angular/core';
import {IProductDefinition, PRODUCTS} from './product-definitions';
import {regexMatches} from '../../helpers/regex';



@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent{
    pageTitle: string = 'Product List';
    imageWidth:number = 50;
    imageMargin:number = 50;
    products: IProductDefinition[] = PRODUCTS;
    filteredProducts: IProductDefinition[] = PRODUCTS;
    showPictures: boolean = true;

    _listFilter: string= '';
    get listFilter(): string{
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    performFilter(filterString: string): IProductDefinition[]{
        //return this.products;
        let filtered_list: IProductDefinition[] = this.products;
        //filtered_list =  filtered_list.filter((prod) =>  prod.productName.includes(filterString));
        //console.log(filtered_list);
        //return filtered_list;
        let filter: string;
        let fil_gen = regexMatches(/([A-Za-z-])+\w/g, filterString);
        let next_filter = fil_gen.next();
        while(!next_filter.done){
            filter = next_filter.value;
            console.log(next_filter);
            filtered_list = filtered_list.filter(prod => {
                return prod.productName.includes(filter);
            });
            next_filter = fil_gen.next();
        }
        return filtered_list;
    }

    togglePictures(): void{
        this.showPictures = !this.showPictures;
    }
}