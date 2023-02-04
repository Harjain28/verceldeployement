import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent implements OnInit {

  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;

  constructor(private event: EventService) { }

  ngOnInit(): void {
  }
   
    countStar(star) {
      this.selectedValue = star;
      // console.log('Value of star', star);
    }

    back(){
      this.event.back();
    }
}
