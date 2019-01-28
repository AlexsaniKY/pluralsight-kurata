import { Component, Input, OnChanges } from "@angular/core";
import { lerp_color } from 'src/helpers/lerp';

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
        let color_obj = lerp_color(
            {r:255, g:255,   b:0}, 
            {r:0,   g:0, b:255}, 
            .5);
        console.log(color_obj);
        this.starColor = "rgb(" + color_obj.r + "," + color_obj.g + "," + color_obj.b + ")";
    }

    

}