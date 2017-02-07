
function mockBadges(state = {
  badges: {},
}, action) {
  if (action.type === 'INIT_MOCK_BADGES') {
    return {
      badges: {
        Feed: 15,
        Notifications: 3,
      },
    };
  }
  if (action.type === 'CLEAR_MOCK_BADGE') {
    return {
      badges: {
        ...state.badges,
        [action.payload]: 0,
      },
    };
  }
  return state;
}

module.exports = mockBadges;
