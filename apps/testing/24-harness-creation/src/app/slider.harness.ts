import {
  BaseHarnessFilters,
  ComponentHarness,
  ComponentHarnessConstructor,
  HarnessPredicate,
} from '@angular/cdk/testing';
import {
  MatSliderHarness,
  MatSliderThumbHarness,
} from '@angular/material/slider/testing';

export class MySliderHarness extends ComponentHarness {
  plusButton = this.locatorFor('#plusButton');
  minusButton = this.locatorFor('#minusButton');
  matSlider = this.locatorFor(MatSliderHarness);
  matSliderThumb = this.locatorFor(MatSliderThumbHarness);

  async clickPlus(): Promise<void> {
    const plusButton = await this.plusButton();
    await plusButton.click();
  }

  async clickMinus(): Promise<void> {
    const minusButton = await this.minusButton();
    await minusButton.click();
  }

  async getValue(): Promise<number> {
    const matSliderThumb = await this.matSliderThumb();
    return matSliderThumb.getValue();
  }

  async getMinValue(): Promise<number> {
    const matSlider = await this.matSlider();
    return matSlider.getMinValue();
  }

  async disabled(): Promise<boolean> {
    const matSlider = await this.matSlider();
    return matSlider.isDisabled();
  }

  async setValue(value: number): Promise<void> {
    const matSliderThumb = await this.matSliderThumb();
    await matSliderThumb.setValue(value);
  }

  static hostSelector = 'app-slider';

  static with<T extends MySliderHarness>(
    this: ComponentHarnessConstructor<T>,
    options: {
      disabled?: boolean;
      minValue?: number;
    } & BaseHarnessFilters = {},
  ): HarnessPredicate<T> {
    return new HarnessPredicate(this, options)
      .addOption('disabled', options.disabled, async (harness, disabled) => {
        return (await harness.disabled()) === disabled;
      })
      .addOption('minValue');
  }
}
