import StyleSheet from 'StyleSheet';
import {colors} from '../../common/styles';

export const styles = StyleSheet.create({
  listViewContainer: {
    flex: 1,
    backgroundColor: colors.greyBackground
  },
  greyContainer: {
    flex: 1,
    backgroundColor: colors.greyBackground
  },
  whiteContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  row: {
    flexDirection: 'row'
  },
  label: {
    padding: 15,
    flex: 2
  },
  inputContainer: {
    flex: 4,
    padding: 10
  },
  errorContainer: {
    alignItems: 'flex-end',
    padding: 3
  },
  errorText: {
    color: 'red'
  }
});
