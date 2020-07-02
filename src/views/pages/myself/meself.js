import React from 'react';
import { ScrollView, View, StyleSheet, Text, Switch } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Icon } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';






class myself extends React.Component {
    constructor() {
        super();
        this.state = {
            user: '未登录',
            wuser:'未登录',
            switchvalue: false,
        }
        this.userlogin = this.userlogin.bind(this)
        this.escuser = this.escuser.bind(this)
    }

    toScreen(routeName) {
        this.props.navigation.navigate(routeName);
    }

    async userlogin() {
        await AsyncStorage.getItem('userlogin').then(resp=>{
            let obj = JSON.parse(resp)
            // console.log(obj,"77777777");
            this.setState({user:obj})
        })

    }

    escuser(){
        this.setState({user:"未登录"})
    }

    componentDidMount(){
        this._unsubscribe = this.props.navigation.addListener('focus',()=>{
            this.userlogin()
            // console.log("222");
        })
        
        
    }
    componentWillUnmount(){
        this._unsubscribe()
    }



    render() {
        return (<ScrollView>
            {/* 头部 */}
            <View style={wstyles.header}>
                {/* 分两部分 */}
                <View style={wstyles.users}>
                    <Icon name="rmb" type="font-awesome" style={wstyles.imgicon} color="#FFF" />
                    <Text style={wstyles.userstext} onPress={this.state.user!=="未登录"?null: () => this.toScreen("user")}>{this.state.user}</Text>
                </View>
                {/* 头部下面的的文字 */}
                <View style={wstyles.textbottom}>
                    <Text style={wstyles.text}>已连续打卡</Text>
                    <Text style={wstyles.text}>已记录天数</Text>
                    <Text style={wstyles.text}>总笔数</Text>
                </View>
            </View>

            <ListItem title="徽章" leftIcon={{ name: 'badge', color: '#888888', type: "simple-line-icon" }} chevron />
            <ListItem title="类别设置" leftIcon={{ name: 'grip-horizontal', type: "font-awesome-5", color: '#888888' }} bottomDivider chevron onPress={() => this.toScreen("lbsz")} />
            <ListItem title="定时提醒" leftIcon={{ name: 'md-time', type: 'ionicon', color: '#888888' }} chevron switch />
            <ListItem title="声音开关" leftIcon={{ name: 'md-alarm', type: 'ionicon', color: '#888888' }} bottomDivider chevron switch />
            <ListItem title="明细详情" leftIcon={{ name: 'list-alt', type: "font-awesome", color: '#888888' }} bottomDivider chevron />
            <ListItem title="升级至尊专业版" leftIcon={{ name: 'diamond', type: "font-awesome", color: '#888888' }} bottomDivider chevron />
            <ListItem title="推荐给好友" leftIcon={{ name: 'sharealt', type: 'antdesign', color: '#888888' }} bottomDivider chevron onPress={this.userlogin} />
            <Text style={this.state.user!=="未登录"?wstyles.botcuser: wstyles.tcuser} onPress={this.escuser}>退出登录</Text>
        </ScrollView>);
    }
}


const wstyles = StyleSheet.create({
    header: {
        height: 150,
        backgroundColor: '#FFDA44',
    },
    users: {
        flexDirection: 'row',
        marginLeft: 110,
        marginTop: 30
    },
    imgicon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#ccc",
        paddingTop: 10
    },
    userstext: {
        fontSize: 23,
        fontWeight: "700",
        marginLeft: 12,
        marginTop: 4
    },
    textbottom: {
        flexDirection: "row",
        marginTop: 46,
        justifyContent: 'space-around'
    },
    text: {
        fontSize: 17
    },
    botcuser:{
        height:40,
        fontSize:16,
        paddingLeft:140,
        paddingTop:13,
        borderTopWidth:8,
        borderTopColor:"#ccc",
        borderStyle:"solid",
        borderBottomWidth:0,
        borderLeftWidth:0,
        borderRightWidth:0,
    },
    tcuser:{
        display:"none"
    }
})

export default myself;
