import StyleSheet from 'StyleSheet';

export const colors = {
  greyBackground: 'rgb(250, 250, 250)',
  greyBorder: 'rgb(240, 240, 240)',
  textFadedGrey: 'rgba(0, 0, 0, 0.3)',
  textGrey: 'rgba(0, 0, 0, 0.5)'
};

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
  }
});
