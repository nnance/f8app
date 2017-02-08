import { connect } from 'react-redux';

import Menu from '../components/Menu';

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Menu);
