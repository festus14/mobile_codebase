import { StyleSheet } from 'react-native'
import { GREY } from '../../utility/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    error: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'column',
    },
    errorText: {
        color: GREY,
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'center',
    },
});