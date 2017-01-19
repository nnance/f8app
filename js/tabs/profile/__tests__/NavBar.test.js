import React from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import NavBar from '../components/NavBar';

describe('<NavBar/>', () => {
  it('render backButton by default', () => {
    const tree = renderer.create(<NavBar/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('can custom rightMenu', () => {
    const dump = shallow(<NavBar renderRightMenu={() => <Text>RButton</Text>}/>);
    const wrapper = shallow(<View>{dump.instance().renderRightMenu()}</View>)
    expect(wrapper.find('Text').length).toBe(1);
  });

  it('handle onPress', () => {
    const leftFn = jest.fn();
    const rightFn = jest.fn();
    const dump = shallow(<NavBar renderRightMenu={() => <Text>RButton</Text>} onLeftPress={leftFn} onRightPress={rightFn}/>);
    const wrapper = shallow(<View>{dump.instance().renderRightMenu()}</View>);
    const touchables = wrapper.find(TouchableOpacity);
    expect(touchables.length).toBeGreaterThan(0);
    touchables.at(0).simulate('press');
    expect(leftFn).not.toBeCalled();
    expect(rightFn).toBeCalled();
  });
});
