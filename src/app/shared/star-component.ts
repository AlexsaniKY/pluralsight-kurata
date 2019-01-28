import { Component, Input, OnChanges } from "@angular/core";
import { lerp_rgb } from 'src/helpers/lerp';

@Component({
    selector: "pm-star",
    templateUrl: "./star-component.html",
    styleUrls: ["./star-component.css"]
})
export class StarComponent implements OnChanges {
    @Input() rating: number;
    starWidth: number;
    starColor: string = "Gold";

    ngOnChanges(): void {
        this.starWidth = this.rating * 75 / 5;
        let color_obj = lerp_rgb(
            {r:153, g:5,   b:5}, 
            {r:255,   g:204, b:0}, 
            this.rating / 5.);
        console.log(color_obj);
        this.starColor = "rgb(" + color_obj.r + "," + color_obj.g + "," + color_obj.b + ")";
    }

    

}