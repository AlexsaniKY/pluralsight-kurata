
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

export function color_ramp(colors:{r:number, g:number, b:number}[], mix){
    console.log(colors);
    if(colors.length === 0) new Error("No colors provided to interpolate");
    if(colors.length === 1) return colors[0];
    let color_interval:number = colors.length / 1.0;
    //find first color
    let color_index:number = Math.floor(mix*(colors.length-1));
    console.log(color_index);
    //clamp to within range
    color_index = color_index >= 0? color_index: 0;
    if(color_index >= colors.length-1) return colors[colors.length-1];
    let col_1 = colors[color_index];
    let col_2 = colors[color_index+1];
    console.log(col_1);
    console.log(col_2);
    console.log(mix*colors.length - color_index);
    return lerp_rgb(col_1, col_2, (mix*(colors.length-1)) - color_index);
}