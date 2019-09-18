import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import BoardView, {PLAYER_1, PLAYER_2} from '../components/BoardView';
import strings from '../../res/Strings';
import colors from '../../res/Colors';


export default class MainScreen extends React.Component {
    
    state = {
        player: PLAYER_1,
        playerText: strings.player1,
    }

    playerTurnChanged = (newPlayer) => {
        this.setState(() => ({
            playerText: newPlayer === PLAYER_1 ? strings.player1 : strings.player2,
            player: newPlayer,
        }));
    }

    render() {
         return (
            <View style={styles.gameBoard}>
                <Text style={styles.playerText}>{this.state.playerText}</Text>
                <BoardView playerTurnChanged={this.playerTurnChanged} />
            </View>
         )
    }
}

const styles = StyleSheet.create({
    gameBoard: {
        margin: 25,
        justifyContent: 'center',
        flex: 1,
    },
    text: {
        textAlign: 'left',
        marginBottom: 20,
        fontSize: 30,
    },
    playerText: {
        textAlign: 'left',
        marginBottom: 20,
        fontSize: 40,
        color: colors.cardPlayerOne,
    },
    

})