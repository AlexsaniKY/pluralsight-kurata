import {Component, OnInit} from '@angular/core';
import {IProductDefinition} from './product-definitions';
import {regexMatches} from '../../helpers/regex';
import { ProductService } from './product.service';

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

/**
 * 
 * @description displays an interactive list of products, with title
 * 
 */
@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit{
    pageTitle: string = 'Product List';
    imageWidth:number = 50;
    imageMargin:number = 25;
    products: IProductDefinition[];
    filteredProducts: IProductDefinition[];
    showPictures: boolean = true;
    sortedBy:string = null;
    sortReverse:boolean = false;

    constructor(private productService: ProductService){
    }

    ngOnInit():void{
        this.products = this.productService.getProducts();
        for(let i=0; i<100; i++) this.products.push(this.productService.randomProduct());
        this.filteredProducts = this.products;
    }

    private _listFilter: string= '';
    /**@description a string to filter the products by.  Altering the value invokes the performFilter method */
    get listFilter(): string{
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    /**
     * @param filterString user search string, containing separate search terms and quotations
     * @description filters the products list based on search criteria
     * @returns a filtered, shallow copy of the products list
     */
    performFilter(filterString: string): IProductDefinition[]{
        let filtered_list: IProductDefinition[] = this.products;
        let filter: string;
        //matches individual words, OR whole contents of quote enclosed strings
        //second half from https://stackoverflow.com/questions/171480/regex-grabbing-values-between-quotation-marks
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

    /**
     * @param field the name of the data member conforming to IProductDefinition
     * @description initiates sorting by the selected values. If already 
     * sorting by this value, reverses the sort direction
     */
    onHeaderClick(field: string){
        if(this.sortedBy === field) this.sortReverse = !this.sortReverse;
        else this.sortReverse = false;
        this.sortedBy = field;

        this.sortProducts(field, this.sortReverse);
    }

    /**
     * @description sorts the products by the field, in ascending order if reverse
     * @param field the data member to sort by
     * @param reverse swaps order from ascending to descending
     */
    sortProducts(field: string, reverse: boolean): void{
        let compare:(a: IProductDefinition, b: IProductDefinition) => number;
        //if sorting by numeric
        if(typeof empty_product[field] === "number" ) 
            compare = (a,b)=>{
                return a[field]-b[field];
            };
        //if sorting by date
        else if(empty_product[field] instanceof Date)
            compare = (a,b)=>{
                return a[field].getTime() - b[field].getTime();
            };
        //if sorting by string. NOTE:any other types fall through to here.
        else compare = (a,b)=>{
            if(a[field] < b[field]) return -1;
            if(a[field] > b[field]) return 1;
            return 0;
        };
        //reverse inputs if necessary
        if(reverse) this.filteredProducts.sort((a,b) => compare(b,a));
        else this.filteredProducts.sort(compare);
    }

    /**
     * @description describes what the value of the rating clicked was
     * @param message string to add to title
     */
    onRatingClicked(message: string): void{
        this.pageTitle = 'Product List: ' + message;
    }

    /** @description toggles images beside products */
    togglePictures(): void{
        this.showPictures = !this.showPictures;
    }
}