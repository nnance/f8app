import Player from '../components/Player';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const query = gql`
  query EpisodeQuery($id: ID!){
    episode(id: $id) {
      no
      title
      likeCount
      commentCount
      viewCount
    }
  }
`;

const mapQueryToProps = ({ data }) => {
  return {
    loading: data.loading,
    episode: data.episode
  };
}
const mapPropsToOptions = ({id}) => ({
  variables: {
    id
  }
});

export default graphql(query, {
  props: mapQueryToProps,
  options: mapPropsToOptions
})(Player);
