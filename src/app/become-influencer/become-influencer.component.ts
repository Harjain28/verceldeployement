import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-become-influencer',
  templateUrl: './become-influencer.component.html',
  styleUrls: ['./become-influencer.component.scss']
})
export class BecomeInfluencerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0)
  }

}
