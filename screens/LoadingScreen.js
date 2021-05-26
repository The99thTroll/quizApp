import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet, 
    Image, FlatList, ActivityIndicator} from "react-native";
import {Header} from "react-native-elements";
import {COLORS} from "../assets/palette";
import {PROBLEMS} from "../assets/problemData"
import {SPLASH_TEXT} from "../assets/splashText"

export default class LoadingScreen extends React.Component{
    randomize(obj) {
        var keys = Object.keys(obj);
        var newArray = []
        for(var x = 0; x < this.state.questions; x++){
            var num = Math.floor(Math.random() * keys.length);
            newArray.push(obj[keys[num]])
            keys.splice(num,1);
        }
        return newArray;
    };

    setMotivation(data){
        var num = Math.floor(Math.random() * data.length);

        this.setState({
            motivation: data[num]
        })
    }

    setQuestions(type){
        if(type === "Basic Operations"){
            this.questions = PROBLEMS.basicOperations
        }else if(type === "More Operations"){
            this.questions = PROBLEMS.moreOperations
        }else if(type === "Advanced Operations"){
            this.questions = PROBLEMS.advancedOperations
        }else if(type === "Review #1"){
            this.questions = PROBLEMS.review1
        }
        this.questions = this.randomize(this.questions);
    }

    constructor(props){
        super(props);

        this.state = {
            quizType: this.props.navigation.getParam('type'),
            destination: this.props.navigation.getParam("destination"),
            questions: this.props.navigation.getParam('questions'),
            motivation: "", 
        }

        this.questions = {}
    }

    componentDidMount(){
        this.setMotivation(SPLASH_TEXT);
        if(this.state.destination === "quizScreen"){
            this.setQuestions(this.state.quizType);
        }
        setTimeout(() => {this.props.navigation.navigate(this.state.destination, {type: this.state.quizType, data: this.questions})}, Math.random() + 2 * 1000)
    }

    render(){
        return(
            <View style={styles.container}>
                <Header centerComponent={{text: "Quiz App",
                style:{fontSize: 32, color: "white", fontWeight: "bold"}}}
                backgroundColor={COLORS.headerColor}/>

                <Text style={styles.title}>Loading. . .</Text>

                <ActivityIndicator size="large" 
                color={COLORS.alternateBackgroundColor}
                style={styles.loading}/>

                <Text style={styles.motivation}>{this.state.motivation}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignContent: "center",
        backgroundColor: COLORS.backgroundColor
    },

    title:{
        alignSelf: "center",
        fontSize: 32,
        fontWeight: "800",
        marginTop: "60%"
    },

    loading:{
        marginTop: "5%"
    },

    motivation:{
        margin: "5%",
        marginTop: "10%",
        textAlign: "center",
        fontSize: 16,
        fontStyle: "italic"
    }
})