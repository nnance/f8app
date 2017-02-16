import { GQC } from 'graphql-compose';

import { models, modelTCs } from './models';

GQC.rootQuery().addFields({
  user: modelTCs.User.get('$findById'),
  userConnection: modelTCs.User.get('$connection'),
  clog: modelTCs.Clog.get('$findOne'),
  clogConnection: modelTCs.Clog.get('$connection'),
  tagConnection: modelTCs.Tag.get('$connection'),
  recommendedClog: {
    type: modelTCs.Clog.getType(),
    resolve: () => models.Clog.findOne({}),
  },
  heroBanners: {
    type: [modelTCs.Clog.getType()],
    resolve: () => models.Clog.find({}),
  },
  editorConnection: modelTCs.Editor.get('$connection'),
});

module.exports = GQC.buildSchema();
