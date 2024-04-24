import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSliderHarness } from '@angular/material/slider/testing';
import { render } from '@testing-library/angular';
import { ChildComponent } from './child.component';

describe('ChildComponent', () => {
  let loader: HarnessLoader;

  beforeEach(async () => {
    const view = await render(ChildComponent);
    loader = TestbedHarnessEnvironment.loader(view.fixture);
  });

  describe('When init', () => {
    test('Then show 1 slider, 3 checkboxes, 4 inputs, 2 buttons', async () => {
      const sliders = await loader.getAllHarnesses(MatSliderHarness);
      const checkboxes = await loader.getAllHarnesses(MatCheckboxHarness);
      const inputs = await loader.getAllHarnesses(MatInputHarness);
      const buttons = await loader.getAllHarnesses(MatButtonHarness);

      expect(sliders).toHaveLength(1);
      expect(checkboxes).toHaveLength(3);
      expect(inputs).toHaveLength(4);
      expect(buttons).toHaveLength(2);
    });

    test('Then initial value of slider thumb is 0', async () => {
      const slider = await loader.getHarness(MatSliderHarness);
      const thumb = await slider.getEndThumb();

      expect(await thumb.getValue()).toBe(0);
    });
  });

  describe('Given maxValue set to 109', () => {
    test('Then slider max value is 109', async () => {
      const slider = await loader.getHarness(MatSliderHarness);
      const input = await loader.getHarness(
        MatInputHarness.with({ selector: '[id="input-max"]' }),
      );

      await input.setValue('109');

      expect(await slider.getMaxValue()).toBe(109);
    });
  });

  describe('When disabled checkbox is toggled', () => {
    test('Then slider is disabled', async () => {
      const slider = await loader.getHarness(MatSliderHarness);
      const checkbox = await loader.getHarness(
        MatCheckboxHarness.with({ label: 'Disabled' }),
      );

      await checkbox.check();

      expect(await slider.isDisabled()).toBeTruthy();
    });
  });

  describe('Given step value set to 5, and When clicking on forward button two times', () => {
    test('Then thumb value is 10', async () => {
      const slider = await loader.getHarness(MatSliderHarness);
      const input = await loader.getHarness(
        MatInputHarness.with({ selector: '[id="input-step"]' }),
      );
      await input.setValue('5');

      const button = await loader.getHarness(
        MatButtonHarness.with({ text: 'arrow_forward_ios' }),
      );

      await button.click();
      await button.click();

      const thumb = await slider.getEndThumb();

      expect(await thumb.getValue()).toBe(10);
    });
  });

  describe('Given slider value set to 5, and step value to 6 and When clicking on back button', () => {
    test('Then slider value is still 5', async () => {
      const slider = await loader.getHarness(MatSliderHarness);
      const thumb = await slider.getEndThumb();

      await thumb.setValue(5);

      const input = await loader.getHarness(
        MatInputHarness.with({ selector: '[id="input-step"]' }),
      );
      await input.setValue('6');

      const button = await loader.getHarness(
        MatButtonHarness.with({ text: 'arrow_back_ios' }),
      );

      await button.click();

      expect(await thumb.getValue()).toBe(5);
    });
  });
});
