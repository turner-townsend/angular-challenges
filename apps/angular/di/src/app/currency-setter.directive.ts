import { Directive, effect, inject, input } from '@angular/core';
import { CurrencyService } from './currency.service';

@Directive({
  selector: '[currencySetter]',
  providers: [CurrencyService],
  standalone: true,
})
export class CurrencySetterDirective {
  currencySetter = input.required<string>();
  #currencyService = inject(CurrencyService);

  constructor() {
    effect(() => {
      this.#currencyService.patchState({ code: this.currencySetter() });
    });
  }
}
