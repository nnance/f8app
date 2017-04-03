import { StyleSheet, Platform } from 'react-native';

export const colors = {
  nearlyWhiteBackground: 'rgb(250, 250, 250)',
  greyBackground: 'rgba(0, 0, 0, 0.2)',
  greyBorder: '#eeeeee',
  pinkBorder: 'rgba(242, 215, 234, 0.8)',
  fadedWhite: 'rgba(255, 255, 255, 0.3)',
  textFadedGrey: 'rgba(0, 0, 0, 0.3)',
  textGrey: 'rgba(0, 0, 0, 0.5)',
  textWhite: 'rgba(255, 255, 255, 1)',
  textPink: 'rgb(249, 65, 92)',
  textFadedPink: 'rgba(249, 65, 92, 0.6)',
  textFadedWhite: 'rgba(255, 255, 255, 0.6)',
};

export const NAV_BAR_HEIGHT = 60;
export const BUTTOM_TAB_HEIGHT = 45;
export const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 15 : 0;
export const NAV_BAR_ICON_HEIGHT = 20;

export const styles = StyleSheet.create({
  navBarIcon: {
    height: NAV_BAR_ICON_HEIGHT,
    resizeMode: 'contain',
  },
});
