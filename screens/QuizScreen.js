import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from "react-native";
import {Header} from "react-native-elements";
import {COLORS} from "../assets/palette";

import * as Animatable from 'react-native-animatable';

const windowHeight = Dimensions.get('window').height;

export default class HomeScreen extends React.Component{
    setColorScheme(type){
        if(type.slice(0,6) === "Review"){
            this.colorScheme = "assessment"
        }

        console.log(this.colorScheme)
    }

    nextProblem(){
        //check this problem
        if(this.state.selectedAns === this.state.correctAns){
            this.setState({
                solvedProblems: this.state.solvedProblems + 1
            })
        }

        console.log(this.state.solvedProblems);

        var questionsAnswered = this.state.questionsAnswered;
        questionsAnswered.push({
            question: this.state.currentQuestion,
            selectedAnswer: this.state.selectedAns,
            correctAnswer: this.state.correctAns
        });

        this.setState({
            questionsAnswered: questionsAnswered,
        })

        //next problem
        var questionNumber = this.state.questionNumber;
        questionNumber+=1;

        this.setState({
            questionNumber: questionNumber,
            selectedAns: null
        })

        this.updateQuestions(questionNumber);
    }

    updateQuestions(currentQuestion){
        var questions = this.questions;
        var key = currentQuestion-1

        
        try{
            this.setState({
                currentQuestion: questions[key]["question"],
                choices: [questions[key]["choice1"], questions[key]["choice2"],
                        questions[key]["choice3"], questions[key]["choice4"]],
                correctAns: questions[key]["correctAns"],
                totalProblems: questions.length
            })
        }catch{
            if(this.state.selectedAns === this.state.correctAns){
                this.props.navigation.navigate("endScreen", 
                {correctProblems: this.state.solvedProblems + 1,
                totalProblems: this.state.totalProblems,
                quizType: this.state.quizType,
                problemData: this.state.questionsAnswered});
            }else{
                this.props.navigation.navigate("endScreen", 
                {correctProblems: this.state.solvedProblems,
                totalProblems: this.state.totalProblems,
                quizType: this.state.quizType,
                problemData: this.state.questionsAnswered});
            }
        }
    }

    constructor(props){
        super(props);

        this.state = {
            quizType: this.props.navigation.getParam('type'),
            questionNumber: 1,

            currentQuestion: "",
            choices: [],
            selectedAns: null,
            correctAns: null,

            totalProblems: 0,
            solvedProblems: 0,
            questionsAnswered: [],
        }

        this.colorScheme = "normal"
        this.questions = this.props.navigation.getParam('data')
    }

    handleViewRef = ref => {this.view = ref};
    otherViewRef = ref => {this.view2 = ref};
    bounceInDown = () => {this.view.bounceInDown(1250)}
    bounceOutUp = () => {this.view.bounceOutUp(750)}
    bounceIn = () => {this.view2.bounceIn(1250)}
    bounceOut = () => {this.view2.bounceOut(700)}

    componentDidMount(){
        this.updateQuestions(this.state.questionNumber);
        this.setColorScheme(this.state.quizType);
    }

    render(){
        return(
            <View style={styles.container}>
                <Header leftComponent={
                <TouchableOpacity style={{alignSelf: "center"}}
                onPress={
                    ()=>{this.props.navigation.navigate("homeScreen")}
                }>
                    <Text style={{fontSize: 24, color: "white", 
                    fontWeight: "bold", justifyContent: "center"}}>
                        Menu
                    </Text>
                </TouchableOpacity>}
                centerComponent={{text: "Quiz App",
                style:{fontSize: 32, color: "white", fontWeight: "bold"}}}
                backgroundColor={COLORS.headerColor}/>

                <View style={styles.topBar}>
                    <Text style={styles.topBarText}>
                        {this.state.questionNumber}/{this.state.totalProblems}
                    </Text>
                </View>

                <Animatable.Text duration={1500} animation="bounceInDown"
                    ref={this.handleViewRef} style={styles.title}>Q{this.state.questionNumber}: {this.state.currentQuestion}</Animatable.Text>

                <Animatable.View ref={this.otherViewRef}>
                {
                this.state.choices.length > 0
                ? this.state.choices.map((doc,index)=>{
                    return(<View>
                    {this.state.selectedAns === doc
                    ?<Animatable.View animation="rubberBand" duration={1000}>
                        <TouchableOpacity style={[styles.answer, this.colorScheme === "assessment" 
                ? {borderColor: COLORS.secondaryTestingColor, backgroundColor: COLORS.alternateBackgroundTestingColor} : {backgroundColor: COLORS.alternateBackgroundColor}]}>
                        <Text style={styles.questionText}>Option {index+1}: </Text>
                        <Text style={styles.answerText}> {doc}</Text>
                    </TouchableOpacity>
                    </Animatable.View>
                    
                    :<Animatable.View animation="bounceIn" duration={1500}>
                        <TouchableOpacity style={[styles.answer, this.colorScheme === "assessment" 
                ? {borderColor: COLORS.secondaryTestingColor, backgroundColor: COLORS.primaryTestingColor} : null]}
                    onPress={
                        ()=>{
                            this.setState({
                                selectedAns: doc
                            })
                        }
                    }>
                        <Text style={styles.questionText}>
                            Option {index+1}: 
                        </Text>
                        <Text style={styles.answerText}> {doc}</Text>
                        </TouchableOpacity>
                    </Animatable.View>}
                    </View>)
                })
                :<Text>Error!</Text>
                }
                </Animatable.View>

                {this.state.selectedAns === null
                ?<TouchableOpacity style={[styles.submit,
                {backgroundColor: "#adadad",borderColor:"#808080"}]}>
                    <Text style={styles.submitText}>
                        SUBMIT
                    </Text>
                </TouchableOpacity>
                
                :<TouchableOpacity style={[styles.submit, this.colorScheme === "assessment" 
                ? {borderColor: COLORS.secondaryTestingColor, backgroundColor: COLORS.primaryTestingColor} : null]}
                onPress={
                    ()=>{
                        try{
                            this.bounceOutUp();
                            this.bounceOut();
                            setTimeout(() => {
                                this.bounceInDown()
                                this.bounceIn()
                                this.nextProblem();
                            }, 750)
                        }catch{
                            this.nextProblem();
                        }
                    }
                }>
                    <Text style={[styles.submitText,{color: "white"}]}>
                        SUBMIT
                    </Text>
                </TouchableOpacity>}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignContent: "center",
        backgroundColor: COLORS.backgroundColor,
        height: windowHeight,
    },

    topBar:{
        flexDirection: "row",
        justifyContent: "flex-end",
        padding: "2.5%"
    },

    topBarText: {
        color: "black",
        fontSize: 24,
        fontWeight: "600"
    },

    title:{
        alignSelf: "center",
        textAlign: "center",
        fontSize: 40,
        fontWeight: "600",
        marginTop: "7.5%",
        marginBottom: "5%"
    },

    answer:{
        alignSelf: "center",
        marginTop: "5%",
        backgroundColor: COLORS.primaryColor,
        padding: "2.5%",

        borderColor: COLORS.secondaryColor,
        borderWidth: 5,
        borderRadius: 15,

        flexDirection: "row",
        width: "50%",
        alignContent: "center",
        justifyContent: "center"
    },

    questionText: {
        color: "white",
        fontSize: 24,
        fontWeight: "800"
    },

    answerText:{
        color: "white",
        fontSize: 24,
        fontWeight: "500"
    },

    submit:{
        alignSelf: "center",
        backgroundColor: COLORS.primaryColor,
        padding: "2.5%",

        borderColor: COLORS.secondaryColor,
        borderWidth: 5,
        borderRadius: 15,

        flexDirection: "row",
        width: "65%",
        alignContent: "center",
        justifyContent: "center",

        marginTop: "10%"
    },

    submitText: {
        color: "black",
        fontSize: 32,
        fontWeight: "800"
    },
})