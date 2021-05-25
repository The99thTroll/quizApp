import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {Header} from "react-native-elements";
import {COLORS} from "../assets/palette";

export default class HomeScreen extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <Header centerComponent={{text: "Quiz App",
                style:{fontSize: 32, color: "white", fontWeight: "bold"}}}
                backgroundColor={COLORS.headerColor}/>

                <Text style={styles.title}>Available Quizzes</Text>

                <View style={styles.allQuizzes}>

                    <View style={styles.quiz}>
                        <Text style={styles.quizTitle}>
                            Math - Easy
                        </Text>

                        <Text style={styles.quizDescription}>
                            Test your reaction time in a short burst of
                            simple math problems.
                        </Text>

                        <TouchableOpacity style={styles.start}
                        onPress={
                            ()=>{
                                this.props.navigation.navigate("quizScreen", {type: "Math - Easy"});
                            }
                        }>
                            <Text style={styles.startText}>Begin</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.quiz}>
                        <Text style={styles.quizTitle}>
                            Math - Hard
                        </Text>

                        <Text style={styles.quizDescription}>
                            A great challenge with some rather
                            tedious problems ready for anyone.
                        </Text>

                        <TouchableOpacity style={styles.start}
                        onPress={
                            ()=>{
                                this.props.navigation.navigate("quizScreen", {type: "Math - Hard"});
                            }
                        }>
                            <Text style={styles.startText}>Begin</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
        fontSize: 28,
        fontWeight: "600",
        marginTop: "2.5%"
    },

    allQuizzes:{
        flex: 1,
        flexDirection: "row"
    },

    quizTitle:{
        fontSize: 26,
        color: "white",
        fontWeight: "bold",
        alignSelf: "center",
        marginTop: "-5%"
    },

    quizDescription:{
        color: "white",
        fontWeight: "300",
        alignSelf: "center",
        marginTop: "2.5%",
        fontSize: 18,
        fontStyle: "italic",
        textAlign: "justify"
    },

    quiz:{
        width: "42%",
        height: "25%",

        padding: "3%",
        margin: "2.5%",

        backgroundColor: COLORS.alternateBackgroundColor,
        borderRadius: 25,

        flex: 1,
    },

    start:{
        alignSelf: "center",
        marginTop: "5%",
        backgroundColor: COLORS.primaryColor,
        padding: "2.5%",

        borderColor: COLORS.secondaryColor,
        borderWidth: 5,
        borderRadius: 15
    },

    startText:{
        color: "white",
        fontSize: 24,
        fontWeight: "500"
    }
})