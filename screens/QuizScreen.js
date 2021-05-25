import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {Header} from "react-native-elements";
import {COLORS} from "../assets/palette";
import {PROBLEMS} from "../assets/problemData";

export default class HomeScreen extends React.Component{
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
        var key = "question"+currentQuestion.toString();

        try{
            this.setState({
                currentQuestion: questions[key]["question"],
                choices: [questions[key]["choice1"], questions[key]["choice2"],
                        questions[key]["choice3"], questions[key]["choice4"]],
                correctAns: questions[key]["correctAns"],
                totalProblems: Object.keys(questions).length
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

    setQuestions(type){
        if(type === "Math - Easy"){
            this.questions = PROBLEMS.easyMath
        }else if(type === "Math - Hard"){
            this.questions = PROBLEMS.hardMath
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
            questionsAnswered: []
        }

        this.questions = {}
    }

    componentDidMount(){
        this.setQuestions(this.state.quizType);
        this.updateQuestions(this.state.questionNumber);
    }

    render(){
        return(
            <View style={styles.container}>
                <Header centerComponent={{text: "Quiz App",
                style:{fontSize: 32, color: "white", fontWeight: "bold"}}}
                backgroundColor={COLORS.headerColor}/>

                <View style={styles.topBar}>
                    <Text style={styles.topBarText}>
                        {this.state.questionNumber}/{this.state.totalProblems}
                    </Text>
                </View>

                <Text style={styles.title}>Q{this.state.questionNumber}: {this.state.currentQuestion}</Text>

                {
                this.state.choices.length > 0
                ? this.state.choices.map((doc,index)=>{
                    return(<View>
                    {this.state.selectedAns === doc
                    ?<TouchableOpacity style={[styles.answer,
                        {backgroundColor: COLORS.alternateBackgroundColor}]}>
                        <Text style={styles.questionText}>Option {index+1}: </Text>
                        <Text style={styles.answerText}> {doc}</Text>
                    </TouchableOpacity>


                    :<TouchableOpacity style={styles.answer}
                    onPress={
                        ()=>{
                            this.setState({
                                selectedAns: doc
                            })
                        }
                    }>
                        <Text style={styles.questionText}>Option {index+1}: </Text>
                        <Text style={styles.answerText}> {doc}</Text>
                    </TouchableOpacity>}
                    </View>)
                })
                :<Text>Error!</Text>
                }

                {this.state.selectedAns === null
                ?<TouchableOpacity style={[styles.submit,
                {backgroundColor: "#adadad",borderColor:"#808080"}]}>
                    <Text style={styles.submitText}>
                        SUBMIT
                    </Text>
                </TouchableOpacity>
                
                :<TouchableOpacity style={styles.submit}
                onPress={
                    ()=>{
                        this.nextProblem();
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
        backgroundColor: COLORS.backgroundColor
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
        fontSize: 40,
        fontWeight: "600",
        marginTop: "7.5%",
        marginBottom: "15%"
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
        marginTop: "20%",
        backgroundColor: COLORS.primaryColor,
        padding: "2.5%",

        borderColor: COLORS.secondaryColor,
        borderWidth: 5,
        borderRadius: 15,

        flexDirection: "row",
        width: "65%",
        alignContent: "center",
        justifyContent: "center"
    },

    submitText: {
        color: "black",
        fontSize: 32,
        fontWeight: "800"
    },
})