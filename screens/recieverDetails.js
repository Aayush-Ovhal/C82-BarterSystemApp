import * as React from "react";
import {View, StyleSheet, TextInput, TouchableOpacity, Text} from "react-native";
import {Card, Icon, Header} from "react-native-elements";
import db from "../config";
import firebase from "firebase";

export default class RecieverDetails extends React.Component{

  constructor(props){
    super(props);
    this.state={
      userId          : firebase.auth().currentUser.email,
      recieverId      : this.props.navigation.getParam('details')["userId"],
      requestId       : this.props.navigation.getParam('details')["requestId"],
      itemName        : this.props.navigation.getParam('details')["itemName"],
      reason_for_requesting     : this.props.navigation.getParam('details')["reasonToRequest"],
      recieverName    : '',
      recieverContact : '',
      recieverAddress : '',
      recieverRequestDocId : ''
    }
  }

  getRecieverDetails=()=>{
   db.collection("users").where("emailId", "==", this.state.recieverId).get()
   .then((snapshot)=>{
     snapshot.forEach((doc)=>{
       this.setState({
         recieverName: doc.data().first_name,
         recieverContact: doc.data().contact,
         recieverAddress: doc.data().address
       })
     })
   })

   db.collection("items").where("requestId", "==", this.state.requestId).get()
   .then((snapshot)=>{
     snapshot.forEach((doc)=>{
       this.setState({
         recieverRequestDocId: doc.id
       })
     })
   })
  }

  updateDatabase=()=>{
    db.collection("all_donations").add({
      "itemName": this.state.itemName,
      "requestId": this.state.requestId,
      "requestedBy": this.state.recieverName,
      "donorId": this.state.userId,
      "requestStatus": "User ready to Exchange"
    })
  }

  componentDidMount(){
    this.getRecieverDetails();
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={{flex:0.1}}>
          <Header
            leftComponent ={<Icon name='arrow-left' type='feather' color='#696969'  onPress={() => this.props.navigation.goBack()}/>}
            centerComponent={{ text:"Exchange Items", style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
            backgroundColor = "#eaf8fe"
          />
        </View>
        <View style={{flex:0.3}}>
          <Card
              title={"Item Details"}
              titleStyle= {{fontSize : 20}}
            >
            <Card >
              <Text style={{fontWeight:'bold'}}>Name : {this.state.itemName}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>Reason : {this.state.reason_for_requesting}</Text>
            </Card>
          </Card>
        </View>
        <View style={{flex:0.3}}>
          <Card
            title={"Reciever Information"}
            titleStyle= {{fontSize : 20}}
            >
            <Card>
              <Text style={{fontWeight:'bold'}}>Name: {this.state.recieverName}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>Contact: {this.state.recieverContact}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>Address: {this.state.recieverAddress}</Text>
            </Card>
          </Card>
        </View>
        <View style={styles.buttonContainer}>
          {
            this.state.recieverId !== this.state.userId
            ?(
              <TouchableOpacity
                  style={styles.button}
                  onPress={()=>{
                    this.updateDatabase()
                  }}>
                <Text>Exchange</Text>
              </TouchableOpacity>
            )
            : null
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  buttonContainer : {
    flex:0.3,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:200,
    height:50,
    justifyContent:'center',
    alignItems : 'center',
    borderRadius: 10,
    backgroundColor: 'orange',
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     },
    elevation : 16
  }
})