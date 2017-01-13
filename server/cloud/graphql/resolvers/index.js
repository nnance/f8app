const resolvers = {
  Query: {
    trending() {
      return [];
    },
    topClog() {
      return {
        title: 'X',
        category: 'D',
        author: {
          name: 'X'
        },
        review: 'X',
        tags: []
      };
    },
    favoriteTags() {
      return [];
    },
    heroBanners() {
      return [];
    }
  }
};

export default resolvers;
