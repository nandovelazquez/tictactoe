import React from 'react';
import {StyleSheet, View, Text, Button, FlatList} from 'react-native';
import Card from '../components/Card';
import strings from '../../res/Strings';
import colors from '../../res/Colors';

export const PLAYER_1 = '1';
export const PLAYER_2 = '2';

export default class BoardView extends React.Component {

    state = {
        dataSource: [[]],
        textToDisplay: strings.playerOptionNull,
        player: PLAYER_1,
    }

    componentDidMount() {
        this.setupData();
    }

    setupData = () => {
        for (let i = 0; i < 9; i++) {
            this.state.dataSource[i] = {title: '', value: 0};
        }

        //console.log(this.state.dataSource);
    }

    renderItem = ({item}) => (
        <Card {...item} 
            textToDisplay={this.state.textToDisplay}
            onCardPressed={this.changePlayerTurn}/>
    );

    changePlayerTurn = () => {
        
        // TODO: Add the tapped card to the sourceData array

        this.setState((prevState) => ({
            player: prevState.player === PLAYER_1 
                ? PLAYER_2 
                : PLAYER_1,
                
            textToDisplay: this.state.player === PLAYER_1 
                ? strings.playerOption1
                : strings.playerOption2,
        }));

        this.props.playerTurnChanged(this.state.player);
    }

    render() {
        return (
            <FlatList
                style={styles.board}
                data={this.state.dataSource}
                renderItem = { this.renderItem }
                keyExtractor = {(item, index) => index.toString()}
                numColumns = {3} />
        )
    }
}

const styles = StyleSheet.create({
    board: {
        flexGrow: 0, // Wrap content only
    }
});