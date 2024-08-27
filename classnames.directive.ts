/* eslint-disable @angular-eslint/directive-selector */

import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { ClassValue } from 'clsx';
import cn from '../utilities/class-names';

@Directive({
  selector: '[cn]',
})
export class ClassNamesDirective implements OnChanges {
  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  @Input() public cn: Array<ClassValue> = [];

  public ngOnChanges(): void {
    const previousClasses = this.elementRef.nativeElement.className;
    const classes = cn(previousClasses, this.cn);
    this.elementRef.nativeElement.className = classes;
  }
}
