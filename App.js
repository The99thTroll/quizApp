import React, {Component} from "react";
import {createSwitchNavigator, createAppContainer} from "react-navigation";
import HomeScreen from "./screens/HomeScreen";
import QuizScreen from "./screens/QuizScreen";
import EndScreen from "./screens/EndScreen"
import ReviewScreen from "./screens/ReviewScreen";
import LoadingScreen from "./screens/LoadingScreen";

export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
    )
  }
}

const switchNavigator = createSwitchNavigator({
  homeScreen: {screen: HomeScreen},
  quizScreen: {screen: QuizScreen},
  endScreen: {screen: EndScreen},
  reviewScreen: {screen: ReviewScreen},
  loadingScreen: {screen: LoadingScreen}
})

const AppContainer = createAppContainer(switchNavigator);