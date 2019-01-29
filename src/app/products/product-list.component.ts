import {Component} from '@angular/core';
import {IProductDefinition, PRODUCTS} from './product-definitions';
import {regexMatches} from '../../helpers/regex';

let empty_product:IProductDefinition = {
    productId: -1,
    productName: "_",
    productCode: "_",
    releaseDate: new Date(),
    description: "_",
    price: -1,
    starRating: -1,
    imageUrl: "_"
};

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
    sortedBy:string = null;
    sortReverse:boolean = false;

    _listFilter: string= '';
    get listFilter(): string{
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    /**
     * 
     * @param filterString user search string, containing separate search terms and quotations
     * @description filters the products list based on search criteria
     * @returns a filtered copy of the products list
     */
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
            //filter returns new shallow copy of array, preventing alteration of products
            filtered_list = filtered_list.filter(prod => { 
                return prod.productName.toLowerCase().includes(filter);
            });
            next_filter = fil_gen.next();
        }
        return filtered_list;
    }

    onTitleClick(field: string){
        console.log(field);
        console.log(empty_product[field]);
        if(this.sortedBy === field) this.sortReverse = !this.sortReverse;
        this.sortedBy = field;

        this.sortProducts(field, this.sortReverse);

    }

    sortProducts(field: string, reverse: boolean): void{
        let compare;
        if(typeof empty_product[field] === "number" ) 
            compare = (a,b)=>{return a[field]-b[field]};
        else if(empty_product[field] instanceof Date)
            compare = (a,b)=>{return a[field].getTime() - b[field].getTime()};
        else compare = (a,b)=>{
            let a_val = a[field];
            let b_val = b[field];
            if(a_val < b_val) return -1;
            if(a_val > b_val) return 1;
            return 0;
        };
        if(reverse) this.filteredProducts.sort((a,b) => compare(b,a));
        else this.filteredProducts.sort(compare);
    }

    onRatingClicked(message: string): void{
        this.pageTitle = 'Product List: ' + message;
    }

    togglePictures(): void{
        this.showPictures = !this.showPictures;
    }
}