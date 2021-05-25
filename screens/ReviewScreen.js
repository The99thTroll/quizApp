import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from "react-native";
import {Header, ListItem} from "react-native-elements";
import {COLORS} from "../assets/palette";

export default class ReviewScreen extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            quizType: this.props.navigation.getParam('quizType'),
            totalProblems: this.props.navigation.getParam('totalProblems'),
            correctProblems: this.props.navigation.getParam('correctProblems'),
            problemData: this.props.navigation.getParam('problemData')
        }
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ( {item, i} ) => { 
        if(item.selectedAnswer === item.correctAnswer){
            return(<View style={[styles.flatListView,{backgroundColor: "#ade1bf"}]}>
                <Text style={styles.flatListTitle}>Question: {item.question}</Text>
                <Text style={styles.flatListSubtext}>You Picked: {item.selectedAnswer}</Text>
                <Text style={styles.flatListSubtext}>Correct Answer: {item.correctAnswer}</Text>
            </View>)
        }else{
            return(<View style={[styles.flatListView,{backgroundColor: "#e0adb1"}]}>
                <Text style={styles.flatListTitle}>Question: {item.question}</Text>
                <Text style={styles.flatListSubtext}>You Picked: {item.selectedAnswer}</Text>
                <Text style={styles.flatListSubtext}>Correct Answer: {item.correctAnswer}</Text>
            </View>)
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <Header centerComponent={{text: "Quiz App",
                style:{fontSize: 32, color: "white", fontWeight: "bold"}}}
                backgroundColor={COLORS.headerColor}/>

                <Text style={[styles.title,{marginTop: "5%"}]}>Your Quiz: {this.state.quizType}</Text>

                <Text style={styles.titleAlt}>
                    You Got: {this.state.correctProblems}/{this.state.totalProblems}
                </Text>

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

                <View style={{flex: 1}}>
                    {this.state.problemData.length===0
                    ? (<View style={{flex: 1}}>
                        <Text>Error</Text>
                    </View>)
                    : (<FlatList keyExtractor={this.keyExtractor}
                    data={this.state.problemData}
                    renderItem={this.renderItem}/>)}
                </View>
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
        fontSize: 34,
        fontWeight: "600",
        marginTop: "2.5%",
    },

    titleAlt:{
        alignSelf: "center",
        fontSize: 28,
        fontWeight: "600",
        marginTop: "2.5%",
        color: "black",
    },

    return:{
        alignSelf: "center",
        marginTop: "10%",
        marginBottom: "2.5%",
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
        marginBottom: "2.5%",
        marginTop: "7.5%",

        width: "50%",

        alignSelf: "center",
    
        backgroundColor: COLORS.alternateBackgroundColor,
        borderRadius: 25,    
    },

    flatListView:{
        backgroundColor: "red",
        marginTop: "2.5%",
        marginBottom: "2.5%",
        width: "75%",
        alignSelf: "center",
        justifyContent: "center",
        padding: "2.5%",

        borderRadius: 15,
        borderWidth: 5,
        borderColor: COLORS.secondaryColor
    },

    flatListTitle:{
        textAlign: "center",
        fontSize: 20,
        fontWeight: "700"
    },

    flatListSubtext:{
        textAlign: "center",
        fontSize: 18,
        fontWeight: "500"
    }
})