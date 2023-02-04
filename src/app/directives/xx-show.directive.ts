import { Directive, Input, OnInit, ViewContainerRef, TemplateRef, ElementRef, HostListener } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[xsShow]'
})
export class XsShowDirective implements OnInit {
  constructor(
    private breakpointObserver: BreakpointObserver,
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {

  }

  ngOnInit() {
    // this.method();
  }

  @Input() set xsShow(val) {
    this.method(val);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.xsShow();
  }

  method(isShow: boolean) {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((state: BreakpointState) => {
        if (state.matches && !isShow) {
          this.viewContainer.clear();
        } else {
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
      });
  }
}
