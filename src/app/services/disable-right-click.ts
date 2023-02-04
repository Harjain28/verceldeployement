import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DisableRightClickService {
  constructor(@Inject(DOCUMENT) private document: Document) { }
  disableRightClick() {
    this.document.addEventListener('contextmenu', (event) =>
      event.preventDefault()
    );
  }

  disableCopyAndCut() {
    this.document.addEventListener('copy', (event) =>
      event.preventDefault()
    );
    this.document.addEventListener('cut', (event) =>
      event.preventDefault()
    );
  }
}
