import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSliderHarness } from '@angular/material/slider/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ChildComponent } from './child.component';

describe('ChildComponent', () => {
  let fixture: ComponentFixture<ChildComponent>;
  let loader: HarnessLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
    });
    fixture = TestBed.createComponent(ChildComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  describe('When init', () => {
    test('Then show 1 slider, 3 checkboxes, 4 inputs, 2 buttons', async () => {
      const checkboxHarnesses =
        await loader.getAllHarnesses(MatCheckboxHarness);
      const sliderHarnesses = await loader.getAllHarnesses(MatSliderHarness);
      const inputHarnesses = await loader.getAllHarnesses(MatInputHarness);
      const buttonHarnesses = await loader.getAllHarnesses(MatButtonHarness);

      expect(await checkboxHarnesses.length).toBe(3);
      expect(await sliderHarnesses.length).toBe(1);
      expect(await inputHarnesses.length).toBe(4);
      expect(await buttonHarnesses.length).toBe(2);
    });

    test('Then initial value of slider thumb is 0', async () => {
      const sliderHarness = await loader.getHarness(MatSliderHarness);
      const endThumb = await sliderHarness.getEndThumb();
      expect(await endThumb.getValue()).toBe(0);
    });
  });

  describe('Given maxValue set to 109', () => {
    test('Then slider max value is 109', async () => {
      const maxValueInputHarness = await loader.getHarness(
        MatInputHarness.with({ selector: '[id="input-max"]' }),
      );
      await maxValueInputHarness.setValue('109');

      const sliderHarness = await loader.getHarness(MatSliderHarness);
      expect(await sliderHarness.getMaxValue()).toBe(109);
    });
  });

  describe('When disabled checkbox is toggled', () => {
    test('Then slider is disabled', async () => {
      const disableCheckbox = await loader.getHarness(
        MatCheckboxHarness.with({ label: 'Disabled' }),
      );
      await disableCheckbox.check();
      const sliderHarness = await loader.getHarness(MatSliderHarness);

      expect(await sliderHarness.isDisabled()).toBeTruthy();
    });
  });

  describe('Given step value set to 5, and When clicking on forward button two times', () => {
    test('Then thumb value is 10', async () => {
      const stepInputHarness = await loader.getHarness(
        MatInputHarness.with({ selector: '[id="input-step"]' }),
      );
      await stepInputHarness.setValue('5');

      const increaseSliderButton = await loader.getHarness(
        MatButtonHarness.with({ text: 'arrow_forward_ios' }),
      );
      await increaseSliderButton.click();
      await increaseSliderButton.click();

      const sliderHarness = await loader.getHarness(MatSliderHarness);
      const endThumb = await sliderHarness.getEndThumb();

      expect(await endThumb.getValue()).toBe(10);
    });
  });

  describe('Given slider value set to 5, and step value to 6 and When clicking on back button', () => {
    test('Then slider value is still 5', async () => {
      const sliderHarness = await loader.getHarness(MatSliderHarness);
      const endThumb = await sliderHarness.getEndThumb();
      await endThumb.setValue(5);

      const stepInputHarness = await loader.getHarness(
        MatInputHarness.with({ selector: '[id="input-step"]' }),
      );
      await stepInputHarness.setValue('6');

      const decreaseSliderButton = await loader.getHarness(
        MatButtonHarness.with({ text: 'arrow_back_ios' }),
      );
      await decreaseSliderButton.click();

      expect(await endThumb.getValue()).toBe(5);
    });
  });
});
