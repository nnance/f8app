import { connect } from 'react-redux';
import { navigate, navigateBack } from '../actions';

const mapStateToProps = state => ({
  navigateTracking: state.navigateTracking,
});

export const withTracking = connect(mapStateToProps, { navigate, navigateBack });
