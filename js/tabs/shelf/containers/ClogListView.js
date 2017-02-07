import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import ClogListView from '../../../common/ClogListView';
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

const query = gql`
  query ClogListView($filter: ClogFilterInput, $orderBy: CLOG_SORTING){
    clogs(filter: $filter, orderBy: $orderBy) {
      ...ClogListView
    }
  }
  ${ClogListView.fragments.clog}
`;

class Container extends React.Component {
  render() {
    return (<View
      style={{
        flex: 1,
        backgroundColor: colors.greyBackground,
      }}
    >
      <NavBar
        backButton
        onBackPress={this.props.onBackPress}
        title={this.props.title}
        containerStyle={styles.navBar}
        titleTextStyle={styles.titleText}
      />
      <ClogListView
        clogs={this.props.clogs}
        onClogPress={this.props.goToBook}
      />
    </View>
    );
  }
}

export const mapPropsToOptions = ({ category, tag, orderBy }) => ({
  variables: {
    filter: {
      category,
      tag,
    },
    orderBy,
  },
});

const mapQueryToProps = ({ data }) => {
  const { loading, clogs, error } = data;
  if (error) {
    console.error('graphql error: ', error);
  }
  return {
    clogs: loading || !!error ? [] : clogs,
  };
};

export default graphql(query, {
  props: mapQueryToProps,
  options: mapPropsToOptions,
})(Container);
