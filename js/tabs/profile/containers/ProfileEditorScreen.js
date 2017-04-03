import { connect } from 'react-redux';

import { changePublicProfile } from '../../../actions/changeProfile';
import { linkFacebook, unlinkFacebook } from '../../../actions/login';

import ProfileEditorScreen from '../components/ProfileEditorScreen';

const select = state => ({
  user: state.user,
  name: state.user.name,
  email: state.user.email,
  sex: state.user.sex,
  birthDayDate: new Date(state.user.birthDayDate),
  saved: state.user.savedProfile,
  facebookLinked: state.user.facebookLinked,
});

const actionsMaping = {
  changePublicProfile,
  linkFacebook,
  unlinkFacebook,
};

export default connect(select, actionsMaping)(ProfileEditorScreen);
