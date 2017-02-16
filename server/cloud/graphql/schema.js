import { GQC } from 'graphql-compose';

import * as models from './models';

GQC.rootQuery().addFields({
  user: models.UserTC.get('$findById'),
  userConnection: models.UserTC.get('$connection'),
  clog: models.ClogTC.get('$findOne'),
  clogConnection: models.ClogTC.get('$connection'),
  tagConnection: models.TagTC.get('$connection'),
  recommendedClog: {
    type: models.ClogTC.getType(),
    resolve: () => models.Clog.findOne({}),
  },
  heroBanners: {
    type: [models.ClogTC.getType()],
    resolve: () => models.Clog.find({}),
  },
});

module.exports = GQC.buildSchema();
