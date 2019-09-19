import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import Card, {CardStyle} from '../components/Card';
import Strings from '../../res/Strings';

export const PLAYER_1 = '1';
export const PLAYER_2 = '2';
const PLAYER_1_TEXT = Strings.playerOption1;
const PLAYER_2_TEXT = Strings.playerOption2;
const CARDS_LENGTH = 9;

export default class BoardView extends React.Component {

    state = {
        player: PLAYER_1,
        cardCounter: 1,
        dataSource: Array.from( {length: CARDS_LENGTH}, () => ({
            index: 0, 
            selectable: true,
            textToDisplay: Strings.playerOptionNull,
            style: CardStyle.textPlayer1,
        })), 
    }

    renderItem = ({item, index}) => (
        <Card {...item} index={index}
            player={this.state.player}
            onCardPressed={this.updateGame}/>
    );

    updateGame = (index) => {
        this.updateCardAndPlayer(index, () => this.validateGame(index));
    }

    // Updates the selected card and player's turn
    updateCardAndPlayer = (index, validateGame) => {
        let newSource = this.state.dataSource;
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
            cardCounter: prevState.cardCounter + 1,
            player: prevState.player === PLAYER_1 ? PLAYER_2 : PLAYER_1,
        }), () => validateGame(index));
    }

    validateGame = (index) => {
        if (this.validateMove(index)) {
            this.blockGrid();
            this.props.onHaveWinner(this.state.player === PLAYER_1 ? PLAYER_2 : PLAYER_1);
            return;
        }
        
        if (this.state.cardCounter === CARDS_LENGTH) {
            this.blockGrid();
            this.props.onTiedGame();
            return;
        }
        
        this.props.playerTurnChanged(this.state.player); 
    }

    blockGrid = () => {
        let cards = this.state.dataSource;
        cards.forEach(element => {element.selectable = false;});

        this.setState(() => ({        
            dataSource: [...cards],
        }));
    }
    
    validateMove = (index) => {
        let items = this.state.dataSource;
        item = items[index];

        // Validate vertical
        let col1 = item.player === items[0].player && item.player === items[3].player && item.player === items[6].player;
        let col2 = item.player === items[1].player && item.player === items[4].player && item.player === items[7].player;
        let col3 = item.player === items[2].player && item.player === items[5].player && item.player === items[8].player;
        if (col1 || col2 || col3) return true;

        // Validate horizontal
        let row1 = item.player === items[0].player && item.player === items[1].player && item.player === items[2].player;
        let row2 = item.player === items[3].player && item.player === items[4].player && item.player === items[5].player;
        let row3 = item.player === items[6].player && item.player === items[7].player && item.player === items[8].player;
        if (row1 || row2 || row3) return true;       

        // Validate on diagonal
        let diaLeft = item.player === items[0].player && item.player === items[4].player && item.player === items[8].player;
        diaRight = item.player === items[2].player && item.player === items[4].player && item.player === items[6].player;
        if (diaLeft || diaRight) return true; 

        return false;
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