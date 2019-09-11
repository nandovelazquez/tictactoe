import React from 'react';
import { Text, 
    StyleSheet, 
    TouchableOpacity} from 'react-native';


export default class Card extends React.Component {
    state = {
        selectable: true,
        textToDisplay: this.props.textToDisplay,
    }

    disableSelection = () => {
        this.setState( () => ({
            selectable: false,
        }));
    }

    componentDidUpdate() {
        // console.log('Card component did update');

        // this.setState( () => ({
        //     textToDisplay: this.props.textToDisplay,
        // }));
    }

    render() {
        return (
            <TouchableOpacity style={styles.card}
                 onPress={() => {
                    this.setState( () => ({
                        textToDisplay: this.props.player,
                    }));
                    console.log(this.props.textToDisplay);

                    this.disableSelection();
                    this.props.onCardPressed();
                }}>
                
                <Text style={styles.text}> {this.state.textToDisplay} </Text>
            </TouchableOpacity>
        )
    }
    
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#aaa',
        flex: 1,
    },
    text: {
        fontSize: 80,
        textAlign: 'center',
    }
});

