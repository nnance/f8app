import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import Player from '../components/Player';

export const query = gql`
  query PlayerQuery($id: MongoID!){
    episode(filter: { _id: $id }) {
      ...Player
    }
  }
  ${Player.fragments.episode}
`;

export const mapQueryToProps = ({ data }) => {
  const { episode, error, loading } = data;
  if (error) {
    console.error('graphql error: ', error);
  }
  return {
    loading,
    episode: episode || {},
  };
};
export const mapPropsToOptions = ({ id }) => ({
  variables: {
    id,
  },
});

export default graphql(query, {
  props: mapQueryToProps,
  options: mapPropsToOptions,
})(Player);
