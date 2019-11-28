import {
    StyleSheet,
    Platform,
} from 'react-native';
import {
    SCREEN_HEIGHT,
} from '../../utility/constants';

import { GREY, MAIN_COLOR, LIGHT_GREY } from '../../utility/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-around'
    },
    image: {
        width: '100%',
        height: SCREEN_HEIGHT * 0.20,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    headText: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        color: GREY,
    },
    vText: {
        color: LIGHT_GREY,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    form: {
        padding: 20,
        height: SCREEN_HEIGHT * 0.45,
        marginHorizontal: 20,
        ...Platform.select({
            ios: {
                shadowColor: 'rgb(77, 84, 124)',
                shadowOpacity: 0.09,
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
            },
            android: {
                elevation: 2,
            },
        }),
        borderRadius: 10,
        justifyContent: 'space-around',
    },
    error: {
        color: '#f00',
        fontSize: 12,
        alignSelf: 'center',
        fontFamily: 'Poppins-Regular',
    },
    remember: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    rememberText: {
        color: GREY,
        fontSize: 12,
    },
    btn: {
        width: '50%',
        alignSelf: 'flex-end',
    },
    btnText: {
        fontWeight: 'normal',
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
    },
    forgotText: {
        color: MAIN_COLOR,
        alignSelf: 'flex-end',
    },
});