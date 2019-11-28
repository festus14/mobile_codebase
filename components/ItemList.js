import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LIGHT_GREY, ALMOST_BLACK, GREY, DARK_GREEN } from '../utility/colors';
import Checkbox from './Checkbox';

export default class ItemList extends Component {
    render() {
        const { item, onPress, isChecked, notifications } = this.props;
        return (
            <View style={{ width: '100%' }}>
                {
                    item.type === 'header' && (<View
                        style={{
                            height: 38,
                            marginLeft: 15,
                            justifyContent: 'center',
                            marginTop: 20,
                        }}
                    >
                        <Text
                            style={{
                                color: DARK_GREEN,
                                fontSize: 11,
                                fontWeight: 'bold',
                            }}
                        >{item.name}</Text>
                    </View>)
                }
                {
                    item.type === 'item' && (
                        <TouchableOpacity
                            style={{
                                height: 40,
                                borderBottomColor: LIGHT_GREY,
                                borderBottomWidth: 0.3,
                                paddingHorizontal: 15,
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexDirection: 'row',
                            }}
                            onPress={() => onPress(item.name)}
                        >
                            <Text
                                style={{
                                    color: ALMOST_BLACK,
                                    fontSize: 13,
                                }}
                            >{item.name}</Text>
                        </TouchableOpacity>
                    )
                }
                {
                    (item.type === 'switch' && notifications.id) ? (
                        <TouchableOpacity
                            style={{
                                height: 40,
                                borderBottomColor: LIGHT_GREY,
                                borderBottomWidth: 0.3,
                                paddingHorizontal: 15,
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexDirection: 'row',
                            }}
                            onPress={() => onPress(item.name)}
                        >
                            <Text
                                style={{
                                    color: ALMOST_BLACK,
                                    fontSize: 13,
                                }}
                            >{item.name}</Text>

                            <Checkbox
                                isChecked={isChecked[item.name] === 1}
                                containerStyle={{ borderColor: GREY }}
                                onPress={() => onPress(item.name)}
                            />
                        </TouchableOpacity>
                    ) : null
                }
            </View>
        );
    }
}
