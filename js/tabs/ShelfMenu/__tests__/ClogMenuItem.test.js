import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { TouchableOpacity } from 'react-native';

import ClogMenuItem, { HideTagButton, ShowTagButton } from '../components/ClogMenuItem';

const user = {
  name: 'ima',
};

const tags = [{ id: '1', title: 'Chat Clog' }, { id: '2', title: 'Video Clog' }, { id: '3', title: 'Video Clog' }];

describe('ClogMenuItem', () => {
  it('render', () => {
    const tree = renderer.create(<ClogMenuItem tags={tags} user={user} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('render with show/hide sub item', () => {
    const wrapper = shallow(<ClogMenuItem tags={tags} user={user} />);
    wrapper.instance().onShowTagPress();
    wrapper.update();
    expect(toJSON(wrapper)).toMatchSnapshot();
    wrapper.instance().onHideTagPress();
    wrapper.update();
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('call onTagPress on press sub item', () => {
    const spy = jest.fn();
    const dump = shallow(<ClogMenuItem tags={tags} user={user} onTagPress={spy} />);
    const wrapper = shallow(dump.instance().renderTagItem());
    wrapper.find(TouchableOpacity).at(1).simulate('press');
    expect(spy).toBeCalledWith('2');
  });

  it('HideTagButton render', () => {
    const tree = renderer.create(<HideTagButton />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('ShowTagButton render', () => {
    const tree = renderer.create(<ShowTagButton />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
