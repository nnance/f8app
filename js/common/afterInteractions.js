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

export const beforeProps = (mapBeforeProps) => element => 
  cloneProps(compose(
    withState('__finish', '__setFinish', false),
    lifecycle({
      componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
          this.props.__setFinish(true);
        });
      }
    }),
    mapProps(ownerProps => {
      if (ownerProps.__finish) {
        return {
          ..._.omit(ownerProps, '__finish', '__setFinish')
        };
      }
      return {
        ...ownerProps,
        ...mapBeforeProps()
      };
    }),
  )(element), element);
