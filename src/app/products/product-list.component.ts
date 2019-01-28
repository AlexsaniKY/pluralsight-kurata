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
    imageMargin:number = 25;
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
        let filtered_list: IProductDefinition[] = this.products;
        let filter: string;
        //matches individual words, OR whole contents of quote enclosed strings
        let fil_gen = regexMatches(/[A-Za-z-'`&]+|(["'])(?:(?=(\\?))\2.)*?\1/g, filterString);
        let next_filter = fil_gen.next();
        while(!next_filter.done){
            filter = next_filter.value.toLowerCase();
            //strip out leading and trailing quotes if they exist
            if(filter.length > 2)
                if((filter[0] === filter[filter.length-1]) && (filter[0] === "\"" || filter[0] === "'") )
                    filter = filter.slice(1, filter.length-1);
            //check search term membership in product names
            filtered_list = filtered_list.filter(prod => { 
                return prod.productName.toLowerCase().includes(filter);
            });
            next_filter = fil_gen.next();
        }
        return filtered_list;
    }

    togglePictures(): void{
        this.showPictures = !this.showPictures;
    }
}