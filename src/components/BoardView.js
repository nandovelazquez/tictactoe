import React from 'react';
import {StyleSheet, View, Text, Button, FlatList} from 'react-native';
import Card, {CardStyle} from '../components/Card';
import Strings from '../../res/Strings';

export const PLAYER_1 = '1';
export const PLAYER_2 = '2';
const PLAYER_1_TEXT = Strings.playerOption1;
const PLAYER_2_TEXT = Strings.playerOption2;

export default class BoardView extends React.Component {

    state = {
        player: PLAYER_1,
        dataSource: Array.from( {length: 9}, () => ({
            index: 0, 
            selectable: true,
            textToDisplay: Strings.playerOptionNull,
            style: CardStyle.textPlayer1,
        })), 
    }

    renderItem = ({item, index}) => (
        <Card {...item} index={index}
            player={this.state.player}
            onCardPressed={this.changePlayerTurn}/>
    );

    changePlayerTurn = (index) => {
        // Creates the a new data source and replaces the old one
        newSource = this.state.dataSource;
        newSource[index] = {
            index: index, 
            player: this.state.player,
            selectable: false,
            textToDisplay: this.state.player === PLAYER_1 
                ? PLAYER_1_TEXT
                : PLAYER_2_TEXT,
            style: this.state.player === PLAYER_1 
                ? CardStyle.textPlayer1
                : CardStyle.textPlayer2,
        }

        this.setState((prevState) => ({        
            dataSource: [...newSource],
            player: prevState.player === PLAYER_1 
                ? PLAYER_2 
                : PLAYER_1,
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
    },
   
});