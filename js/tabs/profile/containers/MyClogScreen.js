import { connect } from 'react-redux';
import MyClogScreen from '../components/MyClogScreen';
import * as mockData from '../mockData';

export default connect(() => ({ clogs: mockData.myClogs }))(MyClogScreen);
