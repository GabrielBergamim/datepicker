import { Directive, ElementRef, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import * as textMask from 'vanilla-text-mask/dist/vanillaTextMask.js';

@Directive({
    selector: `fed-mask, [fed-mask], [fedMask]`
})
export class FedMaskDirective implements OnInit, OnDestroy {
    @HostBinding('class.fed-mask') compClass = true;

    @Input()
    fedMask = {
        mask: [],
        showMask: false,
        guide: true,
        placeholderChar: '_'
    };

    maskedInputController: any;

    constructor(private element: ElementRef) { }

    ngOnInit(): void {
        this.maskedInputController = textMask.maskInput({
            inputElement: this.element.nativeElement,
            ...this.fedMask
        });
    }

    ngOnDestroy() {
        this.maskedInputController.destroy();
    }
}
