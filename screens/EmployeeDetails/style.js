import {
    StyleSheet,
    Platform
} from 'react-native';
import {
    GREY,
    DARK_BLUE,
    SECONDARY_COLOR,
    ALMOST_BLACK
} from '../../utility/colors';
import {
    SCREEN_HEIGHT
} from '../../utility/constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    data: {
        flex: 1,
        margin: 15,
    },
    personal: {
        minHeight: SCREEN_HEIGHT * 0.14,
        justifyContent: 'flex-start',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 3
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: 1000,
        marginRight: 25,
    },
    name: {
        color: DARK_BLUE,
        fontSize: 15,
        fontWeight: 'bold',
    },
    email: {
        color: GREY,
        fontSize: 12,
    },
    staffId: {
        color: GREY,
        fontSize: 12,
    },
    line: {
        backgroundColor: SECONDARY_COLOR,
        height: 0.5,
        marginHorizontal: 3,
        marginVertical: 10,
    },
    section: {
        width: '100%',
        padding: 3,
        marginVertical: 5
    },
    sectionTitle: {
        fontSize: 17,
        color: ALMOST_BLACK,
        fontWeight: 'bold',
        marginBottom: 10
    },
    sectionDetails: {
        backgroundColor: '#fff',
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
                elevation: 4,
            },
        }),
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        borderRadius: 5
    },
    itemContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 3,
        justifyContent: 'space-between'
    },
    itemTextOne: {
        fontSize: 12,
        color: GREY
    },
    itemTextTwo: {
        fontSize: 14,
        color: ALMOST_BLACK
    }
});