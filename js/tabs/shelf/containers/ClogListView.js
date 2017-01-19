import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import ClogListView from '../../../common/ClogListView';
import {fragments} from '../../../models/clog';

const query = gql`
  query ClogList {
    getClogs {
      ...clogMetaData
      createdAt
    }
  }
  ${fragments.clogMetaData}
`;

const mapQueryToProps = ({ ownProps, data }) => {
  const {loading, getClogs} = data;
  return {
    clogs: loading ? [] : getClogs
  };
};

export default graphql(query, {
  props: mapQueryToProps
})(ClogListView);
