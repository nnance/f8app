import StyleSheet from 'StyleSheet';
import { colors } from '../../common/styles';

const styles = StyleSheet.create({
  listViewContainer: {
    flex: 1,
    backgroundColor: colors.nearlyWhiteBackground,
  },
  greyContainer: {
    flex: 1,
    backgroundColor: colors.nearlyWhiteBackground,
  },
  whiteContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
  },
  label: {
    padding: 15,
    flex: 2,
  },
  inputContainer: {
    flex: 4,
    padding: 10,
  },
  errorContainer: {
    alignItems: 'flex-end',
    padding: 3,
  },
  errorText: {
    color: 'red',
  },
});

export {
  colors,
  styles,
};
