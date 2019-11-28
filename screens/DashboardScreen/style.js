import { StyleSheet } from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../utility/constants';
import { ALMOST_BLACK, GREY, DARK_GREEN, SECONDARY_COLOR } from '../../utility/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: '15%',
        alignItems: 'center'
    },
    rando: {
        position: 'absolute',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT * 0.3,
        backgroundColor: SECONDARY_COLOR
    },
    imageContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 180,
        width: 180,
        borderRadius: 1000
    },
    name: {
        color: ALMOST_BLACK,
        fontFamily: 'Poppins-Bold',
        fontSize: 20,
        marginTop: 20
    },
    email: {
        color: GREY,
        fontFamily: 'Poppins-Regular',
        fontSize: 15
    },
    staffId: {
        color: GREY,
        fontFamily: 'Poppins-Regular',
        fontSize: 14
    },
    company: {
        color: GREY,
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15
    }
})