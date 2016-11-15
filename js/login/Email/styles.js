'use strict';

import StyleSheet from 'StyleSheet';
import Dimensions from 'Dimensions';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  buttonSession: {
    padding: 80
  },
  inputSession: {
    paddingTop: height * 0.1,
    alignItems: 'center'
  },
  input: {
    width: 0.8 * width,
    fontSize: 20
  },
  changePageText: {
    textAlign: 'center'
  },
  forgotPasswordText: {
    paddingHorizontal: width * 0.1,
    alignSelf: 'flex-end'
  },
  errorText: {
    color: 'red'
  }
})
