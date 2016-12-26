import React from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import NavBar from '../NavBar';

describe('<NavBar/>', () => {
  it('render backButton by default', () => {
    const tree = renderer.create(<NavBar/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('render title', () => {
    const wrapper = shallow(<NavBar title="test title"/>);
    expect(wrapper.contains('test title')).toBe(true);
  });

  it('can custom rightMenu', () => {
    const wrapper = shallow(<NavBar renderRightMenu={() => <Text>RButton</Text>}/>)
    expect(wrapper.contains(<Text>RButton</Text>)).toBe(true);
  });

  it('handle onPress', () => {
    const leftFn = jest.fn();
    const rightFn = jest.fn();
    const wrapper = shallow(<NavBar renderRightMenu={() => <Text>RButton</Text>} onLeftPress={leftFn} onRightPress={rightFn}/>);
    const touchables = wrapper.find(TouchableOpacity);
    expect(touchables.length).toBeGreaterThan(0);
    touchables.at(0).simulate('press');
    expect(leftFn).toBeCalled();
    expect(rightFn).not.toBeCalled();
    touchables.at(1).simulate('press');
    expect(rightFn).toBeCalled();
  });
});

const A = props => (<TouchableOpacity onPress={props.onPress}></TouchableOpacity>)
