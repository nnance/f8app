import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import { default as BaseClogListView } from '../../../common/ClogListView';
import { colors } from '../../../common/styles';
import NavBar from '../components/NavBar';

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: 'rgb(0, 150, 253)',
  },
  titleText: {
    color: 'white',
  },
});

class ClogListView extends React.Component {
  render() {
    return (<View
      style={{
        flex: 1,
        backgroundColor: colors.nearlyWhiteBackground,
      }}
    >
      <NavBar
        backButton
        onBackPress={this.props.onBackPress}
        title={this.props.title}
        containerStyle={styles.navBar}
        titleTextStyle={styles.titleText}
      />
      <BaseClogListView
        clogs={this.props.clogs}
        onClogPress={this.props.goToBook}
      />
    </View>
    );
  }
}

ClogListView.fragments = BaseClogListView.fragments;

export default ClogListView;
