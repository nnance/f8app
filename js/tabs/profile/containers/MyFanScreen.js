import {connect} from 'react-redux';
import {MyFanScreen} from '../components/UserContainer';
import * as mockData from '../mockData';

export default connect(() => ({ userList: mockData.myFan }))(MyFanScreen);
