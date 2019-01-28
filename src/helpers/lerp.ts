
//from https://en.wikipedia.org/wiki/Linear_interpolation, protected from fp error,
//does not bounds-check the mix to domain [0,1]
export function lerp(num_min:number, num_max:number, mix:number): number{
    return ((1-mix) * num_min) + (mix * num_max);

}

export function lerp_rgb(
        col_1:{r:number,g:number,b:number}, 
        col_2:{r:number,g:number,b:number}, 
        mix:number){
    return {
        r: lerp(col_1.r,col_2.r,mix),
        g: lerp(col_1.g,col_2.g,mix),
        b: lerp(col_1.b,col_2.b,mix),
    }
}