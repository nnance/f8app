import React from 'react';

import BorderButton from './BorderButton';

export const FollowButton = props => (
  <BorderButton
    caption="ติดตาม" type="lightGreen" containerStyle={{
      height: 25,
      width: 70,
      paddingHorizontal: 0,
      alignItems: 'center',
    }}
    {...props}
  />
);

export const UnfollowButton = props => (
  <BorderButton
    caption="เลิกติดตาม" type="fadedGrey" containerStyle={{
      height: 25,
      width: 70,
      paddingHorizontal: 0,
      alignItems: 'center',
    }}
    {...props}
  />
);
