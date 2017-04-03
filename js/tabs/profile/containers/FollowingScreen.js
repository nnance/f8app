import { connect } from 'react-redux';
import { FollowingScreen } from '../components/UserContainer';
import * as mockData from '../mockData';

export default connect(() => ({ userList: mockData.following }))(FollowingScreen);
