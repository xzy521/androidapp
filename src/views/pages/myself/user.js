import React from 'react';
import { ScrollView, Text, View, StyleSheet, Button, Alert, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


class user extends React.Component {
    constructor() {
        super()
        this.state={
            valueuser:'',
            valuepassword:''
        }
        this.login=this.login.bind(this)
    }

    async login(){
        if(this.state.valueuser=="xzy"&&this.state.valuepassword=="123"){
            console.log("账号是：",this.state.valueuser,"密码是：",this.state.valuepassword);    
            let arr=[]
            arr.push(this.state.valueuser)
            await AsyncStorage.setItem('userlogin', JSON.stringify(arr))
            this.props.navigation.navigate('meself');
        }else{
            Alert.alert('提示', '账号或密码不正确，请重新输入');
        }
        
    }


    render() {
        return (
            <ScrollView>
                <View style={styles.inputcvie}>
                    <Text style={styles.onetext}>账号</Text>
                    <TextInput placeholder="请输入账号" style={styles.inputc} 
                    value={this.state.valueuser}
                    onChangeText={(values) => { this.setState({ valueuser: values}) }}
                     />
                </View>
                <View style={styles.inputcvietow}>
                    <Text style={styles.onetext}>密码</Text>
                    <TextInput placeholder="请输入密码" style={styles.inputc}
                    value={this.state.valuepassword}
                    onChangeText={(values) => { this.setState({ valuepassword: values}) }}
                    />
                </View>
                <View style={styles.but}>
                    <Button title="登录" color="#FFDA44" onPress={this.login} />
                </View>
                <View style={styles.botomc}>
                    <Text style={styles.zhpaswd}>找回密码</Text>
                    <Text style={styles.zhpaswdtow}>注册</Text>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    inputcvie: {
        width: 320,
        marginLeft: 20,
        flexDirection: 'row',
        marginTop: 140,
        borderWidth: 1,
        borderStyle: 'solid',
        borderTopColor: "#F2F0EF", borderLeftColor: "#F2F0EF", borderRightColor: "#F2F0EF",
        borderBottomColor: "#ccc"
    },
    inputcvietow: {
        width: 320,
        marginLeft: 20,
        flexDirection: 'row',
        marginTop: 10,
        borderWidth: 1,
        borderStyle: 'solid',
        borderTopColor: "#F2F0EF", borderLeftColor: "#F2F0EF", borderRightColor: "#F2F0EF",
        borderBottomColor: "#ccc"
    },
    onetext: {
        fontSize: 18,
        marginTop: 10,
        color: "#666",
        paddingLeft: 15,
    },
    inputc: {
        marginLeft: 10
    },
    but: {
        marginLeft: 20,
        marginTop: 60,
        width: 320,
    },
    botomc:{
        flexDirection:'row',
        marginTop:20
    },
    zhpaswd:{
        fontSize:16,
        marginLeft:20,
        color:"#666"
    },
    zhpaswdtow:{
        fontSize:16,
        marginLeft:226,
        color:"#666",
    }
})

export default user

