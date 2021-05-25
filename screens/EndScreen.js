import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {Header} from "react-native-elements";
import {COLORS} from "../assets/palette";

export default class EndScreen extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            quizType: this.props.navigation.getParam('quizType'),
            totalProblems: this.props.navigation.getParam('totalProblems'),
            correctProblems: this.props.navigation.getParam('correctProblems'),
            problemData: this.props.navigation.getParam('problemData')
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <Header centerComponent={{text: "Quiz App",
                style:{fontSize: 32, color: "white", fontWeight: "bold"}}}
                backgroundColor={COLORS.headerColor}/>

                <Text style={[styles.title,{marginTop: "35%"}]}>Your Quiz:</Text>
                <Text style={[styles.title,{marginTop: 0}]}>{this.state.quizType}</Text>

                <View style={styles.miniContainer}>
                    <Text style={styles.titleAlt}>You Got:</Text>
                    <Text style={[styles.titleAlt,{marginTop: 0}]}>
                        {this.state.correctProblems}/{this.state.totalProblems}
                    </Text>
                </View>

                <TouchableOpacity style={styles.return}
                onPress={
                    ()=>{
                        this.props.navigation.navigate("homeScreen");
                    }
                }>
                    <Text style={[styles.returnText,{color: "white"}]}>
                        Return To Menu
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.return}
                onPress={
                    ()=>{
                        this.props.navigation.navigate("reviewScreen", 
                        {correctProblems: this.state.correctProblems,
                        totalProblems: this.state.totalProblems,
                        quizType: this.state.quizType,
                        problemData: this.state.problemData});
                    }
                }>
                    <Text style={[styles.returnText,{color: "white"}]}>
                        Review Mistakes
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignContent: "center",
        backgroundColor: COLORS.backgroundColor,
    },

    title:{
        alignSelf: "center",
        fontSize: 42,
        fontWeight: "600",
        marginTop: "2.5%",
    },

    titleAlt:{
        alignSelf: "center",
        fontSize: 42,
        fontWeight: "600",
        marginTop: "2.5%",
        color: "white",
    },

    return:{
        alignSelf: "center",
        marginTop: "10%",
        backgroundColor: COLORS.primaryColor,
        padding: "2.5%",

        borderColor: COLORS.secondaryColor,
        borderWidth: 5,
        borderRadius: 15,

        flexDirection: "row",
        width: "70%",
        alignContent: "center",
        justifyContent: "center",
    },

    returnText: {
        color: "black",
        fontSize: 32,
        fontWeight: "800",
        textAlign: "center"
    },

    miniContainer: {
        padding: "3%",
        margin: "2.5%",
        marginTop: "7.5%",

        width: "50%",

        alignSelf: "center",
    
        backgroundColor: COLORS.alternateBackgroundColor,
        borderRadius: 25,    
    }
})