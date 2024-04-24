import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSliderHarness } from '@angular/material/slider/testing';
import { render } from '@testing-library/angular';
import { ChildComponent } from './child.component';
describe('ChildComponent', () => {
  const setup = async () => {
    const { fixture } = await render(ChildComponent);
    const loader = TestbedHarnessEnvironment.loader(fixture);
    return loader;
  };
  describe('When init', () => {
    test('Then show 1 slider, 3 checkboxes, 4 inputs, 2 buttons', async () => {
      const loader = await setup();
      const sliders = await loader.getAllHarnesses(MatSliderHarness);
      const checkboxes = await loader.getAllHarnesses(MatCheckboxHarness);
      const inputs = await loader.getAllHarnesses(MatInputHarness);
      const buttons = await loader.getAllHarnesses(MatButtonHarness);
      expect(sliders.length).toBe(1);
      expect(checkboxes.length).toBe(3);
      expect(inputs.length).toBe(4);
      expect(buttons.length).toBe(2);
    });

    test('Then initial value of slider thumb is 0', async () => {
      const loader = await setup();
      const slider = await loader.getHarness(MatSliderHarness);
      const value = await slider.getEndThumb();
      expect(await value.getValue()).toBe(0);
    });
  });

  describe('Given maxValue set to 109', () => {
    test('Then slider max value is 109', async () => {
      const loader = await setup();
      const maxInput = await loader.getHarness(
        MatInputHarness.with({ selector: '#input-max' }),
      );
      const slider = await loader.getHarness(MatSliderHarness);
      maxInput.setValue('109');
      const max = await slider.getMaxValue();
      expect(await max).toBe(109);
    });
  });

  describe('When disabled checkbox is toggled', () => {
    test('Then slider is disabled', async () => {
      const loader = await setup();
      const slider = await loader.getHarness(MatSliderHarness);
      const checkbox = (await loader.getAllHarnesses(MatCheckboxHarness))[2];
      await checkbox.check();
      expect(await slider.isDisabled()).toBe(true);
    });
  });

  describe('Given step value set to 5, and When clicking on forward button two times', () => {
    test('Then thumb value is 10', async () => {
      const loader = await setup();
      const slider = await loader.getHarness(MatSliderHarness);
      const stepInput = await loader.getHarness(
        MatInputHarness.with({ selector: '#input-step' }),
      );
      await stepInput.setValue('5');
      const forwardButton = (await loader.getAllHarnesses(MatButtonHarness))[1];
      await forwardButton.click();
      await forwardButton.click();
      const value = await slider.getEndThumb();
      expect(await value.getValue()).toBe(10);
    });
  });

  describe('Given slider value set to 5, and step value to 6 and When clicking on back button', () => {
    test('Then slider value is still 5', async () => {
      const loader = await setup();
      const slider = await loader.getHarness(MatSliderHarness);
      const valueInput = await loader.getHarness(
        MatInputHarness.with({ selector: '#input-value' }),
      );
      const stepInput = await loader.getHarness(
        MatInputHarness.with({ selector: '#input-step' }),
      );
      await valueInput.setValue('5');
      await stepInput.setValue('6');
      const backButton = await loader.getHarness(
        MatButtonHarness.with({ selector: 'button' }),
      );
      await backButton.click();
      const value = await slider.getEndThumb();
      expect(await value.getValue()).toBe(5);
    });
  });
});
