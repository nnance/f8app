const screenTracking = store => next => (action) => {
  const fromScreen = store.getState().navigateTracking.url;
  const result = next(action);
  const toScreen = store.getState().navigateTracking.url;
  if (fromScreen !== toScreen) {
    console.log(`change screen: ${toScreen}`);
  }
  return result;
};

export default screenTracking;
