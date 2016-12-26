import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ListView
} from 'react-native';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import PureListView from '../../../common/PureListView';
import ActivityScreen, {ActivityRow} from '../ActivityScreen';

const mockActivity = [
  {
    title: 'act 1',
    uri: 'a1.img',
    activity: 'like',
    outline: 'O1',
    date: new Date(2016, 5, 12)
  },
  {
    title: 'act 2',
    uri: 'a2.img',
    activity: 'read',
    date: new Date(2015, 5, 12)
  },
  {
    title: 'act 3',
    uri: 'a3.img',
    activity: 'like',
    date: new Date(2014, 5, 12)
  },
  {
    title: 'act 4',
    uri: 'a4.img',
    activity: 'read',
    date: new Date(2013, 5, 12)
  }
];

describe('ActivityScreen', () => {
  it('render pureListView with activity data', () => {
    const fakeRow = {title: 'T'};
    const wrapper = shallow(<ActivityScreen activity={mockActivity}/>);
    const pureListView = wrapper.find(PureListView);
    expect(pureListView.props().data).toBe(mockActivity);
    expect(pureListView.props().renderRow(fakeRow).type).toBe(ActivityRow);
  });

  describe('ActivityRow', () => {
    it('render like activity', () => {
      const tree = renderer.create(<ActivityRow {...mockActivity[0]}/>)
      expect(tree.toJSON()).toMatchSnapshot();
    });

    it('render read activity', () => {
        const tree = renderer.create(<ActivityRow {...mockActivity[1]}/>)
        expect(tree.toJSON()).toMatchSnapshot();
    });
  });
});
