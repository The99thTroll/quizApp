import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet, 
    Image, FlatList} from "react-native";
import {Header} from "react-native-elements";
import {COLORS} from "../assets/palette";
import {QUIZZES} from "../assets/quizData";

export default class HomeScreen extends React.Component{

    lengthIndicator(data){
        if(data === "Short"){
            return(<View style={{backgroundColor: "#2eff17", borderRadius: 10,
            padding: 5, alignSelf: "center", marginTop: "2%"}}>
                <Text style={{color: "#0f9900", fontWeight: "bold"}}>
                {data}
                </Text>
            </View>)
        }else if(data === "Medium"){
            return(<View style={{backgroundColor: "#e8e810",borderRadius: 10,
            padding: 5, alignSelf: "center", marginTop: "2%"}}>
                <Text style={{color: "#828201", fontWeight: "bold"}}>
                {data}
                </Text>
            </View>)
        }else if(data === "Lengthy"){
            return(<View style={{backgroundColor: "#ed1127",borderRadius: 10,
            padding: 5, alignSelf: "center", marginTop: "2%"}}>
                <Text style={{color: "#8a000d", fontWeight: "bold"}}>
                {data}
                </Text>
            </View>)
        }else{
            return(<View style={{backgroundColor: "#a50dff",borderRadius: 10,
            padding: 5, alignSelf: "center", marginTop: "2%"}}>
                <Text style={{color: "#57008a", fontWeight: "bold"}}>
                {data}
                </Text>
            </View>)
        }
    }
    
    keyExtractor = (item, index) => index.toString()

    renderItem = ( {item, i} ) => { 
        return(
            <View style={styles.allQuizzes}>

            <View style={styles.quiz}>
                <View style={styles.subrow}>
                    <View style={{width: "20%"}}>
                        <Image source={item.badge}
                        style={styles.badge}/>
                    </View>

                    <View style={[styles.otherAltSubrow,{width: "60%"}]}>
                        <Text style={styles.quizTitle}>
                            {item.title}
                        </Text>

                        {this.lengthIndicator(item.length)}
                    </View>
                </View>

                <View style={styles.altSubrow}>
                    <Text style={styles.quizDescription}>
                        {item.description}
                    </Text>

                    <TouchableOpacity style={styles.start}
                    onPress={
                        ()=>{
                            this.props.navigation.navigate("loadingScreen", {type: item.title, 
                                                                        destination: "quizScreen",
                                                                        questions: item.questions});
                        }
                    }>
                        <Text style={styles.startText}>Begin</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>)
    }

    render(){
        return(
            <View style={styles.container}>
                <Header centerComponent={{text: "Quiz App",
                style:{fontSize: 32, color: "white", fontWeight: "bold"}}}
                backgroundColor={COLORS.headerColor}/>

                <Text style={styles.title}>Available Quizzes</Text>

                <FlatList keyExtractor={this.keyExtractor}
                    data={QUIZZES}
                    renderItem={this.renderItem}/>
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
        textAlign: "center"
    },

    quizDescription:{
        color: "white",
        fontWeight: "300",
        alignSelf: "center",
        marginTop: "2.5%",
        fontSize: 18,
        fontStyle: "italic",
        textAlign: "justify",
        width: "50%"
    },

    quiz:{
        padding: "3%",
        paddingTop: "5%",
        paddingBottom: "5%",
        margin: "2.5%",

        backgroundColor: COLORS.alternateBackgroundColor,
        borderRadius: 25,

        flex: 1,
        justifyContent: "center",
        alignSelf: 'flex-start',

        shadowColor: "black",
        shadowOpacity: 100,
        shadowOffset: {width: 4, height: 4}
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
    },

    subrow: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    },

    altSubrow: {
        flexDirection: "row",
        justifyContent: "space-around"
    },

    otherAltSubrow: {
        flexDirection: "column",
        justifyContent: "center"
    },

    badge:{
        width: 90, 
        height: 90,
    }
})