import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSliderHarness } from '@angular/material/slider/testing';
import { render } from '@testing-library/angular';
import { ChildComponent } from './child.component';

describe('ChildComponent', () => {
  async function init() {
    const { fixture } = await render(ChildComponent);
    const loader = TestbedHarnessEnvironment.loader(fixture);

    const sliders = await loader.getAllHarnesses(MatSliderHarness);
    const checkboxes = await loader.getAllHarnesses(MatCheckboxHarness);
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    const buttons = await loader.getAllHarnesses(MatButtonHarness);

    return { sliders, checkboxes, inputs, buttons };
  }

  describe('When init', () => {
    test('Then show 1 slider, 3 checkboxes, 4 inputs, 2 buttons', async () => {
      const { sliders, checkboxes, inputs, buttons } = await init();

      expect(sliders.length).toBe(1);
      expect(checkboxes.length).toBe(3);
      expect(inputs.length).toBe(4);
      expect(buttons.length).toBe(2);
    });

    test('Then initial value of slider thumb is 0', async () => {
      const { sliders } = await init();

      const thumb = await sliders[0].getEndThumb();

      expect(await thumb.getValue()).toBe(0);
    });
  });

  describe('Given maxValue set to 109', () => {
    test('Then slider max value is 109', async () => {
      const { sliders, inputs } = await init();

      await inputs[2].setValue('109');

      expect(await sliders[0].getMaxValue()).toBe(109);
    });
  });

  describe('When disabled checkbox is toggled', () => {
    test('Then slider is disabled', async () => {
      const { checkboxes, sliders } = await init();

      await checkboxes[2].toggle();

      expect(await sliders[0].isDisabled()).toBe(true);
    });
  });

  describe('Given step value set to 5, and When clicking on forward button two times', () => {
    test('Then thumb value is 10', async () => {
      const { buttons, inputs, sliders } = await init();

      await inputs[3].setValue('5');

      await buttons[1].click();
      await buttons[1].click();

      const thumb = await sliders[0].getEndThumb();

      expect(await thumb.getValue()).toBe(10);
    });
  });

  describe('Given slider value set to 5, and step value to 6 and When clicking on back button', () => {
    test('Then slider value is still 5', async () => {
      const { buttons, inputs, sliders } = await init();
      await inputs[0].setValue('5');
      await inputs[3].setValue('6');
      await buttons[0].click();

      const thumb = await sliders[0].getEndThumb();

      expect(await thumb.getValue()).toBe(5);
    });
  });
});
