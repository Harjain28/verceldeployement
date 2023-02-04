import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-find-influencers',
  templateUrl: './find-influencers.component.html',
  styleUrls: ['./find-influencers.component.scss']
})
export class FindInfluencersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0)
  }

}
