import { Directive, HostListener, Input, ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[xsHide]'
})
export class XsHideDirective {

  constructor(
    private breakpointObserver: BreakpointObserver,
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {

  }

  @Input() set xsHide(val) {
    this.method(val);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.xsHide();
  }

  method(isShow: boolean) {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((state: BreakpointState) => {
        if (state.matches && !isShow) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      });
  }
}
