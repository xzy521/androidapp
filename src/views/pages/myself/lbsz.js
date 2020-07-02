import React from 'react';
import { ScrollView, Text, View, StyleSheet, Alert, SectionList, FlatList } from 'react-native';
import { SearchBar, ListItem, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { Value } from 'react-native-reanimated';


class lbsz extends React.Component {
    constructor() {
        super();
        this.state = {
            isalgin: true,
            isalgintow: false,
            prodert: [],
            productList: [
                
            ],
            prddd: [
                
            ]
        }
        this.addCart = this.addCart.bind(this)
        this.addCartd = this.addCartd.bind(this)
        this.toScreen = this.toScreen.bind(this)
        this.aaaaaaaaa =this.aaaaaaaaa.bind(this)
        this.delzc= this.delzc.bind(this)
        this.delsr= this.delsr.bind(this)
    }

    addCart() {
        this.setState({ isalgin: true, isalgintow: false, prodert: this.state.productList })
        console.log("addcart");
        
        // this.setState({})
    }
    addCartd() {
        this.setState({ isalgintow: true, isalgin: false, prodert: this.state.prddd })
    }


    toScreen(routeName) {
        this.props.navigation.navigate(routeName);
    }

    // 删除支出
    async delzc(i){
        console.log("支出");
        try{
            this.setState({productList:this.state.productList.splice(i,1)})
            let arr= []
            for (i in this.state.productList){
               const ads =  this.state.productList[i].category;
                arr.push(ads)
            }
            console.log(arr,"99999");
            await AsyncStorage.setItem('zcarr', JSON.stringify(arr))
            this.aaaaaaaaa()
        }catch(e){
            console.log("4174",e);
            
        }
        
    }

    // 删除收入
    async delsr(i){
        try{
            this.setState({prddd:this.state.prddd.splice(i,1)})
            let arr= []
            for (i in this.state.prddd){
               const ads =  this.state.prddd[i].category;
                arr.push(ads)
            }
            console.log(arr,"99999");
            await AsyncStorage.setItem('category', JSON.stringify(arr))
            this.aaaaaaaaa()
        }catch(e){
            console.log("4174",e);
            
        }
        // await AsyncStorage.clear()

    }



    componentDidMount(){
        this._unsubscribe = this.props.navigation.addListener('focus',()=>{
            this.aaaaaaaaa()
            console.log("1111");
        })
        
        
    }
    componentWillUnmount(){
        this._unsubscribe()
    }

    async aaaaaaaaa(){
               await AsyncStorage.getItem('category').then(resp=>{
                   let obj = JSON.parse(resp)
                 const sdp =  obj.map((item) => ({ category:item}))
                //    console.log("8888866666",sdp);
                   this.setState({prddd:sdp})     
               })
               await AsyncStorage.getItem('zcarr').then(resp=>{
                   let objzc = JSON.parse(resp)
                 const sdpzc =  objzc.map((item) => ({ category:item}))
                //    console.log("8888866666",sdpzc);
                   this.setState({productList:sdpzc,prodert:sdpzc})     
               })
               console.log("aaaaaaa");
               this.setState({ isalgin: true, isalgintow: false})
       
      }


    render() {
        return (
            <>
                {/* 头部 */}
                <View style={styles.header}>
                    <View style={styles.sss}>
                        <Icon name="left" type="antdesign" onPress={() => this.toScreen("meself")} />
                        <Text style={styles.textone} onPress={this.aaaaaaaaa}>类别设置</Text>
                    </View>

                    <View style={styles.headerbottoms}>
                        <Text style={this.state.isalgin ? styles.textleft : styles.textright} onPress={() => this.addCart()}>支出</Text>
                        <Text style={this.state.isalgintow ? styles.textleft : styles.textright} onPress={() => this.addCartd()}>收入</Text>
                    </View>
                </View>
                <FlatList
                    data={this.state.prodert}
                    renderItem={({ item ,index }) => {
                        // console.log('item:', item)
                        return (<View style={styles.lists}>
                            <Icon name="minuscircle" type="antdesign" color="red" style={styles.listicon} onPress={this.state.isalgin ?()=>{this.delzc(index)}:()=>{this.delsr(index)}} />
                            <Text style={styles.textlist}>{item.category}</Text>
                        </View>)
                    }}
                    keyExtractor={(item,index) => index+''}
                />
                <Text style={styles.listitem} onPress={this.state.isalgin ? () => this.toScreen("addtjzc") : () => this.toScreen("addtjsr")} >点击添加</Text>
            </>
        );
    }
}


const styles = StyleSheet.create({
    header: {
        height: 120,
        backgroundColor: '#FFDA44',
    },
    headerbottoms: {
        flexDirection: 'row',
        marginTop: 28,
        marginLeft: 50
    },
    textone: {
        fontSize: 20,
        marginLeft: 110,
    },
    textleft: {
        fontSize: 16,
        width: 120,
        height: 30,
        backgroundColor: '#666666',
        textAlign: "center",
        paddingTop: 3,
        borderWidth: 1,
        borderStyle: "solid",
        borderTopColor: '#666', borderRightColor: '#666', borderLeftColor: '#666',
        borderBottomColor: '#666'
    },
    textright: {
        fontSize: 16,
        width: 120,
        height: 30,
        textAlign: "center",
        paddingTop: 3,
        borderWidth: 1,
        borderStyle: "solid",
        borderTopColor: '#666', borderRightColor: '#666', borderLeftColor: '#666',
        borderBottomColor: '#666'
    },
    lists: {
        flexDirection: 'row',
        paddingTop: 10,
        height: 40,
        borderWidth: 1,
        borderTopColor: '#fff',
        borderBottomColor: "#ccc"
    },
    listicon: {
        marginLeft: 10
    },
    sss:{
        flexDirection:'row',
        marginTop:20
    },
    textlist: {
        marginLeft: 10,
        fontSize: 16
    },
    listitem: {
        height: 40,
        borderWidth: 1,
        borderStyle: "solid",
        borderBottomColor: "#fff",
        borderTopColor: "#ccc",
        fontSize: 18,
        paddingLeft: 140,
        paddingTop: 8,
    }
})

export default lbsz;