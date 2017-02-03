import {connect} from 'react-redux';
import {FollowerScreen} from '../components/UserContainer';
import * as mockData from '../mockData';

export default connect(() => ({ userList: mockData.follower }))(FollowerScreen);
