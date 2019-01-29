import { Component, Input, OnChanges, Output, EventEmitter } from "@angular/core";
import { lerp_rgb, color_ramp } from 'src/helpers/lerp';

@Component({
    selector: "pm-star",
    templateUrl: "./star-component.html",
    styleUrls: ["./star-component.css"]
})
export class StarComponent implements OnChanges {
    @Input() rating: number;
    starWidth: number;
    starColor: string = "Gold";
    @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

    ngOnChanges(): void {
        this.starWidth = this.rating * 75 / 5;
        let color_obj = color_ramp(
            [
                {r:153, g:5,   b:5  }, 
                {r:255, g:204, b:0  },
                {r:0,   g:204, b:102}    
            ], 
            this.rating / 5.);
        this.starColor = "rgb(" + color_obj.r + "," + color_obj.g + "," + color_obj.b + ")";
    }

    onClick(): void {
        console.log(`rating ${this.rating} clicked`);
        this.ratingClicked.emit(`rating ${this.rating} clicked`);
    }

}