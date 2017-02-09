import { connect } from 'react-redux';

import {logOutWithPrompt} from '../../../actions';

import Home from '../components/Home';

export default connect(
    state => ({
      user: state.user,
      followingCount: 1800,
      followerCount: 1800,
      candys: 100,
    }),
    {
      logOutWithPrompt,
    },
)(Home);
