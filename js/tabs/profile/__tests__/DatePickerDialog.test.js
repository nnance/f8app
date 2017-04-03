import React from 'react';
import renderer from 'react-test-renderer';
import Platform from 'Platform';
import { shallow } from 'enzyme';

import {
  DatePickerIOS,
  Button,
} from 'react-native';

/* eslint import/first: off */
jest.mock('DatePickerAndroid');
import DatePickerAndroid from 'DatePickerAndroid';
import DatePickerDialog from '../components/DatePickerDialog';

describe('DatePickerDialog', () => {
  let oldPlatform;

  beforeAll(() => {
    oldPlatform = Platform.OS;
  });
  afterAll(() => {
    Platform.OS = oldPlatform;
  });

  describe('android', () => {
    beforeAll(() => {
      Platform.OS = 'android';
    });

    it('render', () => {
      const tree = renderer.create(<DatePickerDialog currentDate={new Date(2016, 5, 12)} />);
      expect(tree.toJSON()).toMatchSnapshot();
    });

    it('return picked date', async () => {
      let gResolve;
      const expectDate = new Date(2016, 5, 12);
      const openDate = new Promise((resolve) => {
        gResolve = resolve;
      });
      DatePickerAndroid.open.mockImplementation(() => openDate);
      const datePickerDialog = shallow(<DatePickerDialog />);
      gResolve({ action: undefined, year: 2016, month: 5, day: 12 });
      const date = await datePickerDialog.instance().open();
      expect(date.toString()).toBe(expectDate.toString());
    });
  });

  describe('ios', () => {
    beforeAll(() => {
      Platform.OS = 'ios';
    });

    it('render', () => {
      const tree = renderer.create(<DatePickerDialog currentDate={new Date(2016, 5, 12)} />);
      expect(tree.toJSON()).toMatchSnapshot();
    });

    it('return picked date', (done) => {
      const expectDate = new Date(2017, 5, 12);
      const wrapper = shallow(<DatePickerDialog />);
      const result = wrapper.instance().open(new Date(2016, 5, 12));
      result.then((date) => {
        expect(date).toBe(expectDate);
        done();
      });
      wrapper.find(DatePickerIOS).props().onDateChange(expectDate);
      wrapper.find(Button).forEach((button) => {
        if (button.props().title === 'ok') {
          button.simulate('press');
        }
      });
    });

    it('cancel pick', (done) => {
      const successFn = jest.fn();
      const wrapper = shallow(<DatePickerDialog />);
      const result = wrapper.instance().open();
      result.then(successFn).catch(() => {
        expect(successFn).not.toBeCalled();
        done();
      });
      wrapper.find(Button).forEach((button) => {
        if (button.props().title === 'cancel') {
          button.simulate('press');
        }
      });
    });
  });
});
