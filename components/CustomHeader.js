import * as React from 'react';
import {View} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default class CustomHeader extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value: ""
        }
    }

    render(){
        return(
            <View>
              <SafeAreaProvider>
                <Header
                 centerComponent={{ text: this.props.title, style: { color: '#90A5A9', fontSize:30,fontWeight:"bold", } }}
                 backgroundColor = "#3F54EB"
                 leftComponent={
                    <Icon
                    name="bars"
                    type="font-awesome"
                    color="#FFFFFF"
                    onPress={
                        ()=>{
                            this.props.navigation.toggleDrawer()
                        }
                    }
                   />
                 }
                />
              </SafeAreaProvider>
            </View>
        )
    }
}