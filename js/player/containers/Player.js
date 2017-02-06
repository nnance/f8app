import Player from '../components/Player';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const query = gql`
  query PlayerQuery($id: ID!){
    episode(id: $id) {
      ...Player
    }
  }
  ${Player.fragments.episode}
`;

export const mapQueryToProps = ({ data }) => {
  const {episode, error, loading} = data;
  if (error) {
    console.error('graphql error: ', error);
  }
  return {
    loading: loading,
    episode: episode || {}
  };
}
export const mapPropsToOptions = ({id}) => ({
  variables: {
    id
  }
});

export default graphql(query, {
  props: mapQueryToProps,
  options: mapPropsToOptions
})(Player);
