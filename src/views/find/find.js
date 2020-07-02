import React from 'react';
import { ScrollView,Text, View,StyleSheet } from 'react-native';
import { SearchBar,ListItem, Input, Icon } from 'react-native-elements';
class find extends React.Component{
    constructor(){
        super();
        this.toScreen = this.toScreen.bind(this)
        this.aaa=this.aaa.bind(this)
    }
aaa(){
    console.log("77777777777777777777");
    
}

    toScreen(routeName){
        this.props.navigation.navigate(routeName);
    }

    render(){
        return (<ScrollView>
            {/* 头部 */}
            <View style={styless.header}>
                <Text style={styless.headertext}>发现</Text>
            </View>
            <ListItem title="账单"  bottomDivider chevron  onPress={()=>this.toScreen("zd")} />
            <View style={styless.viewcent}>
                <Text style={styless.textcenter}>常用功能</Text>
                <View style={styless.vie}>
                    {/* 图标应用导航 */}
                    <View style={styless.ico}  onPress={this.aaa}>
                        <Icon name="instagram" type="antdesign" color="#FFDA44" />
                        <Text style={styless.icotext}>二手交易</Text>
                    </View>
                    <View style={styless.ico}>
                        <Icon name="car" type="font-awesome" color="#FFDA44" />
                        <Text style={styless.icotextss}>二手车</Text>
                    </View>
                    <View style={styless.ico}>
                        <Icon name="pets"  color="#FFDA44" />
                        <Text style={styless.icotexts}>宠物</Text>
                    </View>
                    <View style={styless.ico}>
                        <Icon name="home" type="antdesign" color="#FFDA44" />
                        <Text style={styless.icotexts}>家政</Text>
                    </View>
                </View>
            </View>
        </ScrollView>);
    }
}

const styless=StyleSheet.create({
    header:{
        height:80,
        backgroundColor:"#FFDA44"
    },
    headertext:{
        fontSize:20,
        fontWeight:"700",
        marginLeft:153,
        marginTop:38
    },
    viewcent:{
        height:130,
        backgroundColor:"#FFF",
        marginTop:30
    },
    vie:{
        flexDirection:"row"
    },
    textcenter:{
        fontSize:16,
        marginLeft:14,
        marginTop:10
    },
    ico:{
        width:80,
        height:80,
        marginTop:20,
        marginLeft:10
    },
    icotext:{
        color:"#FFDA44",
        marginLeft:12,
        marginTop:10
    },
    icotexts:{
        color:"#FFDA44",
        marginLeft:24,marginTop:10
    },
    icotextss:{
        color:"#FFDA44",
        marginLeft:20,marginTop:10
    }
})

export default find;