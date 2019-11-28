import { StyleSheet } from 'react-native';
import { GREY } from '../../utility/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    data: {
        flex: 1,
    },
    error: {
        color: GREY,
        alignSelf: 'center',
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'center'
    },
});
