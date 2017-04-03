import 'isomorphic-fetch';
import React from 'react';
import { Dimensions } from 'react-native';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import graphql from '../../../libs/mockGraphQL';
import { query, mapQueryToProps, mapPropsToOptions } from '../containers/ClogCategory';
import ClogCategoryComponent, { RecommendClogs } from '../components/ClogCategory';
import HorizontalListView from '../../../common/HorizontalListView';

describe('Shelf.ClogCategory', () => {
  it('can query schema', async () => {
    const failSpy = jest.fn();
    const result = await graphql(query, mapPropsToOptions({ category: 'D' })).catch(failSpy);
    expect(failSpy).not.toBeCalled();
    expect(result.data).not.toBeUndefined();
    expect(result.errors).toBeUndefined();
  });

  it.only('render correct', async () => {
    const result = await graphql(query, mapPropsToOptions({ category: 'D' }));
    const props = mapQueryToProps({ data: result.data });
    const tree = renderer.create(<ClogCategoryComponent category="D" {...props} />);
    // console.log(tree.toJSON())
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('navigate to ClogListView onPress viewAll', async () => {
    const result = await graphql(query, mapPropsToOptions({ category: 'D' }));
    const props = mapQueryToProps({ data: result.data });
    const goToClogListView = jest.fn();
    const onPress = jest.fn();
    const dump = shallow(<ClogCategoryComponent {...{ ...props, goToClogListView, category: 'D' }} />);
    const wrapper = shallow(dump.instance().renderButtonViewAllClog(onPress));
    wrapper.simulate('press');
    expect(onPress).toBeCalled();
  });

  it('onRecommendClogChange should set currentClogBanner', async () => {
    const result = await graphql(query, mapPropsToOptions({ category: 'D' }));
    const props = mapQueryToProps({ data: result.data });
    const wrapper = shallow(<ClogCategoryComponent {...{ ...props, category: 'D' }} />);
    wrapper.find(RecommendClogs).props().onIndexChange(2);
    expect(wrapper.state().currentClogBanner).toBe(2);
  });

  describe('RecommendClogs', () => {
    it('render', async () => {
      const result = await graphql(query, mapPropsToOptions({ category: 'D' }));
      const props = mapQueryToProps({ data: result.data });
      const tree = renderer.create(<RecommendClogs category="D" clogs={props.recommendedClogs} />);
      expect(tree.toJSON()).toMatchSnapshot();
    });

    it('call onIndexChange onScroll', async () => {
      const windowSize = Dimensions.get('window').width - 20;
      const result = await graphql(query, mapPropsToOptions({ category: 'D' }));
      const props = mapQueryToProps({ data: result.data });
      const spy = jest.fn();
      const wrapper = shallow(<RecommendClogs category="D" clogs={props.recommendedClogs} onIndexChange={spy} />);
      wrapper.find(HorizontalListView).simulate('scroll', { nativeEvent: { contentOffset: { x: windowSize * 2 } } });
      expect(spy).toBeCalledWith(2);
      wrapper.find(HorizontalListView).simulate('scroll', { nativeEvent: { contentOffset: { x: windowSize * 0 } } });
      expect(spy).toBeCalledWith(0);
      wrapper.find(HorizontalListView).simulate('scroll', { nativeEvent: { contentOffset: { x: windowSize * -1 } } });
      expect(spy).toBeCalledWith(0);
    });

    it('onPress should navigate to book', async () => {
      const result = await graphql(query, mapPropsToOptions({ category: 'D' }));
      const props = mapQueryToProps({ data: result.data });
      const goToBook = jest.fn();
      const wrapper = shallow(<RecommendClogs goToBook={goToBook} category="D" clogs={props.recommendedClogs} />);
      wrapper.instance().onPress(5);
      expect(goToBook).toBeCalledWith(5);
    });
  });
});
