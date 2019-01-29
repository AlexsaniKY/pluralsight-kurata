//strongly typed allows html autocompletion to assist, DOES NOT PROTECT AGAINST A MALFORMED JSON
//defining the data as strongly typed members inside a *.ts would catch the malformed data however
export interface IProductDefinition {
    productId: number;
    productName: string;
    productCode: string;
    releaseDate: Date;
    description: string;
    price: number;
    starRating: number;
    imageUrl: string;
}

export let PRODUCTS: IProductDefinition[] = [
    {
        "productId": 1,
        "productName": "Leaf Rake",
        "productCode": "GDN-0011",
        "releaseDate": new Date("2016-03-19"),
        "description": "Leaf rake with 48-inch wooden handle.",
        "price": 19.95,
        "starRating": 3.2,
        "imageUrl": "https://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
    },
    {
        "productId": 2,
        "productName": "Garden Cart",
        "productCode": "GDN-0023",
        "releaseDate": new Date("2016-03-18"),//"March 18, 2016",
        "description": "15 gallon capacity rolling garden cart",
        "price": 32.99,
        "starRating": 2.5,
        "imageUrl": "https://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png"
    },
    {
        "productId": 5,
        "productName": "Hammer",
        "productCode": "TBX-0048",
        "releaseDate": new Date("2016-05-21"),//"May 21, 2016",
        "description": "Curved claw steel hammer",
        "price": 8.9,
        "starRating": 1.1,
        "imageUrl": "https://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png"
    },
    {
        "productId": 8,
        "productName": "Saw",
        "productCode": "TBX-0022",
        "releaseDate": new Date("2016-05-15"),//"May 15, 2016",
        "description": "15-inch steel blade hand saw",
        "price": 8.55,
        "starRating": 3.7,
        "imageUrl": "https://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png"
    },
    {
        "productId": 10,
        "productName": "Video Game Controller",
        "productCode": "GMG-0042",
        "releaseDate": new Date("2015-10-15"),//"October 15, 2015",
        "description": "Standard two-button video game controller",
        "price": 35.95,
        "starRating": 4.8,
        "imageUrl": "https://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png"
    }
]