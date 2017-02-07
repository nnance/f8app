import React from 'react';

import { NavBarWithButton } from '../../../common/NavBar';

export { HEIGHT } from '../../../common/NavBar';

export default class NavBar extends React.Component {
  render() {
    return (
      <NavBarWithButton
        {...this.props}
      />
    );
  }
}
