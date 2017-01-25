import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import ClogListView from '../../../common/ClogListView';
import {fragments} from '../../../models/clog';
import {colors} from '../../../common/styles';

import NavBar from '../components/NavBar';

const query = gql`
  query ClogListView($filter: ClogFilterInput, $orderBy: CLOG_SORTING){
    clogs(filter: $filter, orderBy: $orderBy) {
      ...clogMetaData
      createdAt
    }
  }
  ${fragments.clogMetaData}
`;

class Container extends React.Component {
  render() {
    return (<View style={{
      flex: 1,
      backgroundColor: colors.greyBackground
    }}>
      <NavBar backButton onBackPress={() => this.props.navigator.pop()} title={this.props.title} containerStyle={styles.navBar} titleTextStyle={styles.titleText}/>
      <ClogListView
        addFixBugListener={this.props.addFixBugListener}
        removeFixBugListener={this.props.removeFixBugListener}
        navigator={this.props.navigator} clogs={this.props.clogs}
        />
    </View>
    );
  }
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: 'rgb(0, 150, 253)'
  },
  titleText: {
    color: 'white'
  }
});

export const mapPropsToOptions = ({category, tag, orderBy}) => ({
  variables: {
    filter: {
      category,
      tag
    },
    orderBy
  }
});

const mapQueryToProps = ({ ownProps, data }) => {
  const {loading, clogs} = data;
  return {
    clogs: loading ? [] : clogs
  };
};

export default graphql(query, {
  props: mapQueryToProps,
  options: mapPropsToOptions
})(Container);
