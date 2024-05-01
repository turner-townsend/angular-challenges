import {
  BaseHarnessFilters,
  ComponentHarness,
  HarnessPredicate,
} from '@angular/cdk/testing';
import {
  MatSliderHarness,
  MatSliderThumbHarness,
} from '@angular/material/slider/testing';

interface MySliderHarnessFilters extends BaseHarnessFilters {
  minValue?: number;
}

export class MySliderHarness extends ComponentHarness {
  static hostSelector = 'app-slider';
  #getPlusButton = this.locatorFor('button#plusButton');
  #getMinusButton = this.locatorFor('button#minusButton');
  #getSlider = this.locatorFor(MatSliderHarness);
  #getSliderThumb = this.locatorFor(MatSliderThumbHarness);

  static with(
    options: MySliderHarnessFilters,
  ): HarnessPredicate<MySliderHarness> {
    return new HarnessPredicate(MySliderHarness, options).addOption(
      'minValue',
      options.minValue,
      async (harness, minValue) => (await harness.getMinValue()) === minValue,
    );
  }

  async clickPlus(times?: number) {
    const button = await this.#getPlusButton();
    for (let i = 0; i < (times ?? 1); i++) {
      await button.click();
    }
  }

  async clickMinus(times?: number) {
    const button = await this.#getMinusButton();
    for (let i = 0; i < (times ?? 1); i++) {
      await button.click();
    }
  }

  async getValue() {
    const sliderThumb = await this.#getSliderThumb();
    return sliderThumb.getValue();
  }

  async getMinValue() {
    const slider = await this.#getSlider();
    return slider.getMinValue();
  }

  async disabled() {
    const slider = await this.#getSlider();
    return slider.isDisabled();
  }

  async setValue(value: number) {
    const sliderThumb = await this.#getSliderThumb();
    return sliderThumb.setValue(value);
  }
}
