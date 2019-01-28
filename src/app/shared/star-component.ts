import { Component, Input } from "@angular/core";

@Component({
    selector: "pm-star",
    templateUrl: "./star-component.html",
    styleUrls: ["./star-component.css"]
})
export class StarComponent {
    @Input() rating: number;
    starWidth: number;

    ngOnChanges(): void {
        this.starWidth = this.rating * 75 / 5;

    }

}