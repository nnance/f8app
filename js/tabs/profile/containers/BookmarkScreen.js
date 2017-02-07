import { connect } from 'react-redux';
import BookmarkScreen from '../components/BookmarkScreen';
import * as mockData from '../mockData';

export default connect(() => ({ bookmark: mockData.bookmark }))(BookmarkScreen);
