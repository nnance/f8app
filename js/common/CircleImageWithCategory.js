import React from 'react';

import CircleImageWithSubImage from './CircleImageWithSubImage';
import { getCategoryIcon } from '../models/clog';

export default props => (
  <CircleImageWithSubImage
    {...props}
    subSource={getCategoryIcon(props.category)}
  />
);
