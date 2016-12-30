import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import PureListView from '../../../common/PureListView';
import ActivityScreen, {ActivityRow} from '../components/ActivityScreen';
import {activity as mockActivity} from '../mockData';

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
      const tree = renderer.create(<ActivityRow {...mockActivity[0]}/>);
      expect(tree.toJSON()).toMatchSnapshot();
    });

    it('render read activity', () => {
        const tree = renderer.create(<ActivityRow {...mockActivity[1]}/>);
        expect(tree.toJSON()).toMatchSnapshot();
    });
  });
});
