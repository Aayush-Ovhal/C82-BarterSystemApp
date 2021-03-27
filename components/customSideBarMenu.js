import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';
import firebase from 'firebase';

export default class CustomSideBarMenu extends React.Component{
    render(){
        return(
            <View style={styles.container}>
               <View>
                   <DrawerItems {...this.props}/>
               </View>
               <View>
                   <TouchableOpacity
                   style={styles.logOutButton}
                    onPress={
                        ()=>{
                            this.props.navigation.navigate("LSscreen")
                            firebase.auth().signOut()
                        }}>
                       <Text style={styles.logOutText}>
                           SIGN OUT
                       </Text>
                   </TouchableOpacity>
               </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    logOutText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    logOutButton: {
      height:30,
      width:'100%',
      justifyContent:'center',
      padding:10,
      marginTop: 500
    }
})