import React, { PureComponent } from 'react';
import { View, FlatList, RefreshControl, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import { styles } from './style';
import AbsenteeismItem from '../../components/AbsenteeismItem';
import { connect } from 'react-redux';
import { getAbsenteeism } from '../../store/actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SECONDARY_COLOR } from '../../utility/colors';

class EmployeeAbsenteeism extends PureComponent {
    static navigationOptions = {
        header: null,
        drawerLabel: 'Absenteeism',
        drawerIcon: ({tintColor}) => (
            <Icon name="ban" color={tintColor} size={20} />
        )
    }

    componentDidMount() {
        this.getThis();
    }

    goBack = () => {
        this.props.navigation.goBack(null);
    }

    openDrawer = () => {
        this.props.navigation.openDrawer();
    }

    getThis = () => {
        const employee = this.props.navigation.getParam('employee', {});
        this.props.getAbsenteeism(employee.id);
    }

    render() {
        const { absenteeism, isLoading } = this.props;
        return (
            <View style={styles.container}>
                <Header
                    title="Absenteeism"
                    leftIcon="md-arrow-back"
                    onLeftPress={this.goBack}
                    rightIcon="ios-menu"
                    onRightPress={this.openDrawer}
                />
                <View style={styles.data}>
                        {absenteeism.length > 0 && !isLoading ? (<FlatList
                            removeClippedSubviews
                            data={absenteeism}
                            keyExtractor={(item, index) => `${index}`}
                            renderItem={({ item, index }) => (
                                <AbsenteeismItem item={item} />
                            )}
                            refreshControl={
                                <RefreshControl
                                    refreshing={isLoading}
                                    onRefresh={this.getThis}
                                />
                            }
                        />) : (isLoading ? <ActivityIndicator style={{ marginTop: 10 }} /> :
                            <View>
                                <Text style={styles.error}>No absenteeism found</Text>
                                <TouchableOpacity onPress={this.getThis}>
                                    <Text style={{ color: SECONDARY_COLOR, textAlign: 'center' }}>Tap to refresh</Text>
                                </TouchableOpacity>
                            </View>)}
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    absenteeism: state.absenteeism.absenteeism,
    isLoading: state.ui.isAbsenteeismLoading,
});

const mapDispatchToProps = dispatch => ({
    getAbsenteeism: (id) => dispatch(getAbsenteeism(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(EmployeeAbsenteeism);
