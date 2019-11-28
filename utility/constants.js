import { Dimensions, StatusBar } from 'react-native';

export const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 28;

export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;

export const API_URL = 'https://portal.ipaysuite.com/api/v1/';
export const PHOTO_URL = 'https://portal.ipaysuite.com/company/profile_picture/';
export const COMPANY_PHOTO_URL = 'https://portal.ipaysuite.com/company/';