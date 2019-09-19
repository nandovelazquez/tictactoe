import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import BoardView, {PLAYER_1, PLAYER_2} from '../components/BoardView';
import strings from '../../res/Strings';
import colors from '../../res/Colors';


export default class MainScreen extends React.Component {
    
    state = {
        enableResetBtn: false,
        playerText: strings.player1,
    }

    playerTurnChanged = (newPlayer) => {
        this.setState(() => ({
            enableResetBtn: true,
            playerText: newPlayer === PLAYER_1 ? strings.player1 : strings.player2,
        }));
    }

    onHaveWinner = (player) => {
        this.setState(() => ({
            enableResetBtn: true,
            playerText: strings.winnerIs + ' ' + player,
        }));
    } 

    onTiedGame = () => {
        this.setState(() => ({
            enableResetBtn: true,
            playerText: strings.tiedGame,
            
        }));
    } 

    resetGame = () => {
        console.log("resetGame clicked!");
        this.render;
    }

    render() {
        return (
            <View style={styles.gameBoard}>
                <Text style={styles.playerText}>{this.state.playerText}</Text>
                
                <BoardView 
                    playerTurnChanged={this.playerTurnChanged}
                    onHaveWinner={this.onHaveWinner}
                    onTiedGame={this.onTiedGame}/>
                
                {/* <Button style={styles.buttons} title={strings.play} /> */}
                <Button 
                    style={styles.buttons} 
                    title={strings.reset}  
                    disabled={!this.state.enableResetBtn}
                    onPress={this.resetGame}/>
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
    buttons: {
        marginTop: 60,
    }

})