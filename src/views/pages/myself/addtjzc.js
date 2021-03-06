
import React from 'react';
import { ScrollView, Text, View, StyleSheet, Button,TextInput, Alert } from 'react-native';
import { SearchBar, ListItem, Input,Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
class addtjzc extends React.Component {
    constructor() {
        super();
        this.state={
            value:""
        }
        this.addCart =this.addCart.bind(this)
        this.toScreen = this.toScreen.bind(this)
    }


    toScreen(routeName) {
        this.props.navigation.navigate(routeName);
    }
    componentDidUpdate(){
        this.addCart()
    }


    async addCart(product){
        if(product){
            let cartData = [];
              const value = await AsyncStorage.getItem('zcarr');
              if(value !== null){
                cartData = JSON.parse(value);
                console.log(value);
              }
              cartData.push(product);
              // 更新本地存储中的数据
              await AsyncStorage.setItem('zcarr', JSON.stringify(cartData));
              Alert.alert('提示', '添加成功');
              this.props.navigation.navigate('lbsz')
        }else{
            // Alert.alert("提示",'不能为空')
        }
       
      }


    render() {
        return (<ScrollView>
            <View style={styles.header}>
            <View style={styles.sss}>
                    <Icon name="left" type="antdesign" onPress={() => this.toScreen("lbsz")}  />
                    <Text style={styles.textone}>添加支出类别</Text>
                </View>
            </View>
            <TextInput
                placeholder='请输入类别'
                leftIcon={{ type: 'feather', name: 'align-left' }}
                onChangeText={(values) => { this.setState({ value: values}) }}
            />
            <Button title="确定" style={styles.butt} color="#FFDA44" onPress={()=>{this.addCart(this.state.value)}} />
        </ScrollView>);
    }
}

const styles = StyleSheet.create({
    header: {
        height: 80,
        backgroundColor: '#FFDA44',
    },
    sss:{
        flexDirection:"row",
        marginTop:20
    },
    textone: {
        fontSize: 20,
        marginLeft: 104,
    },
    
})


export default addtjzc;