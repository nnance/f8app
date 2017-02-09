import {
  InteractionManager,
} from 'react-native';
import { compose, mapProps, lifecycle, withState } from 'recompose';
import _ from 'lodash';

function cloneProps(a, b) {
  _.keys(b).forEach((key) => {
    a[key] = b[key];
  });
  return a;
}

export const beforeProps = (overrideProps = {}) => element => 
  cloneProps(compose(
    withState('finishInteraction', '__setFinishInteraction', false),
    lifecycle({
      componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
          this.props.__setFinishInteraction(true);
        });
      }
    }),
    mapProps(ownerProps => {
      const pureProps = _.omit(ownerProps, '__setFinishInteraction')
      if (pureProps.finishInteraction) {
        return pureProps;
      }
      return {
        ...pureProps,
        ...(_.isFunction(overrideProps) ? overrideProps(pureProps) : overrideProps)
      };
    }),
  )(element), element);
