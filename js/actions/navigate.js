export function navigate(route) {
  return {
    type: 'NAV_TO',
    payload: route,
  };
}

export function navigateBack() {
  return {
    type: 'NAV_BACK',
  };
}
