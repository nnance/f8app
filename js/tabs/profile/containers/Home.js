import { connect } from 'react-redux';
import Home from '../components/Home';
import * as mockData from '../mockData';

export default connect(state => ({ user: state.user, followingCount: 1800, followerCount: 1800, candys: 100 }))(Home);
