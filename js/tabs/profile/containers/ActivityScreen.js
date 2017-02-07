import { connect } from 'react-redux';
import ActivityScreen from '../components/ActivityScreen';
import * as mockData from '../mockData';

export default connect(() => ({ activity: mockData.activity }))(ActivityScreen);
