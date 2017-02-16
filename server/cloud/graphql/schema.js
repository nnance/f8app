import { GQC, TypeComposer } from 'graphql-compose';

import { models, modelTCs } from './models';

const CategoryDetailTC = TypeComposer.create('CategoryDetail');

CategoryDetailTC.addFields({
  recommendedClogs: modelTCs.Clog.get('$findMany'),
  editors: modelTCs.Editor.get('$findMany'),
});

GQC.rootQuery().addFields({
  user: modelTCs.User.get('$findById'),
  userConnection: modelTCs.User.get('$connection'),
  clog: modelTCs.Clog.get('$findOne'),
  clogConnection: modelTCs.Clog.get('$connection'),
  clogs: modelTCs.Clog.get('$findMany'),
  trendingClogs: modelTCs.Clog.get('$findMany'),
  tagConnection: modelTCs.Tag.get('$connection'),
  tags: modelTCs.Tag.get('$findMany'),
  recommendedClog: {
    type: modelTCs.Clog.getType(),
    resolve: () => models.Clog.findOne({}),
  },
  heroBanners: {
    type: [modelTCs.Clog.getType()],
    resolve: () => models.Clog.find({}),
  },
  editor: modelTCs.Editor.get('$findById'),
  editors: modelTCs.Editor.get('$findMany'),
  editorConnection: modelTCs.Editor.get('$connection'),
  categoryDetail: {
    type: CategoryDetailTC,
    args: {
      category: {
        type: modelTCs.Clog.getFieldType('category')
      },
    },
    resolve: (source, args, context, info) => {
      return { category: args.category };
    },
  },
});

module.exports = GQC.buildSchema();
