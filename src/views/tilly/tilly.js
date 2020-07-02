import React from 'react';
import { ScrollView, Text, View, StyleSheet, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import Picker from 'react-native-picker'
import AsyncStorage from '@react-native-community/async-storage';
class tilly extends React.Component {
    constructor() {
        super();
        this.state = {
            isalgin: true,
            isalgintow: false,
            lbtext: '请选择类别',
            lbtextsr: '请选择类别',
            currentDate: this._getCurrentDate(),
            payzcprice: '',
            paysrprice: '',
            payzcremeakr: "",
            paysrremeakr: '',
            proid:new Date()
        }
        // this.setc = this.setc.bind(this)
        this.addCartd = this.addCartd.bind(this)
        this.addCart = this.addCart.bind(this)
        this._getCurrentDate = this._getCurrentDate.bind(this)
        this._createDateData = this._createDateData.bind(this)
        this._showDatePicker = this._showDatePicker.bind(this)
        this.lbszpicr = this.lbszpicr.bind(this)
        this.lbszsr = this.lbszsr.bind(this)
        this.payzc = this.payzc.bind(this)
        this.format  = this.format.bind(this)
        this.escdel = this.escdel.bind(this)
        // this.paysr = this.paysr(this)
    }


    format () {
        let ss = new Date()
        let years = ss.getFullYear()
        let mount = ss.getMonth()+1
        let day = ss.getDate()
        let h = ss.getHours()
        let min =ss.getMinutes()
        let mm = ss.getSeconds()
        //   var o = { 
        //     "M+" : this.getMonth()+1,                 //月份 
        //     "d+" : this.getDate(),                    //日 
        //     "h+" : this.getHours(),                   //小时 
        //     "m+" : this.getMinutes(),                 //分 
        //     "s+" : this.getSeconds(),                 //秒 
        //     "q+" : Math.floor((this.getMonth()+3)/3), //季度 
        //     "S"  : this.getMilliseconds()             //毫秒 
        // }; 
        let ap = `${years}${mount}${day}${h}${min}${mm}`
        return ap ; 
        }
    // 当前日期时间
    _getCurrentDate() {
        var currDate = new Date()
        var year = currDate.getFullYear()
        var month = (currDate.getMonth() + 1).toString()
        month = month.padStart(2, '0')
        var dateDay = currDate.getDate().toString()
        dateDay = dateDay.padStart(2, '0')
        let time = year + '-' + month + '-' + dateDay
        return time;

    }
    // 组装日期组件

    _createDateData() {
        let date = [];
        var currDate = new Date()
        var year = currDate.getFullYear()
        var month = currDate.getMonth() + 1
        for (let i = 1970; i <= year; i++) {
            let month = [];
            for (let j = 1; j < 13; j++) {
                let day = [];
                if (j === 2) {
                    for (let k = 1; k < 29; k++) {
                        day.push(k + '日');
                    }
                    //Leap day for years that are divisible by 4, such as 2000, 2004
                    if (i % 4 === 0) {
                        day.push(29 + '日');
                    }
                }
                else if (j in { 1: 1, 3: 1, 5: 1, 7: 1, 8: 1, 10: 1, 12: 1 }) {
                    for (let k = 1; k < 32; k++) {
                        day.push(k + '日');
                    }
                }
                else {
                    for (let k = 1; k < 31; k++) {
                        day.push(k + '日');
                    }
                }
                let _month = {};
                _month[j + '月'] = day;
                month.push(_month);
            }
            let _date = {};
            _date[i + '年'] = month;
            date.push(_date);
        }
        return date;
    }
    //   时间选择的 picker

    _showDatePicker() {
        var year = ''
        var month = ''
        var day = ''
        var dateStr = this.state.currentDate
        //console.log('dateStr',dateStr)
        year = dateStr.substring(0, 4)
        month = parseInt(dateStr.substring(5, 7))
        day = parseInt(dateStr.substring(8, 10))
        Picker.init({
            pickerTitleText: '时间选择',
            pickerCancelBtnText: '取消',
            pickerConfirmBtnText: '确定',
            selectedValue: [year + '年', month + '月', day + '日'],
            pickerBg: [255, 255, 255, 1],
            pickerData: this._createDateData(),
            pickerFontColor: [33, 33, 33, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                var year = pickedValue[0].substring(0, pickedValue[0].length - 1)
                var month = pickedValue[1].substring(0, pickedValue[1].length - 1)
                month = month.padStart(2, '0')
                var day = pickedValue[2].substring(0, pickedValue[2].length - 1)
                day = day.padStart(2, '0')
                let str = year + '-' + month + '-' + day
                this.setState({
                    currentDate: str,
                })
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
                // console.log('date', pickedValue, pickedIndex);
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
                // console.log('date', pickedValue, pickedIndex);
            }
        });
        Picker.show();
    }

    // 支出类别选择的picker
    async lbszpicr() {
        let arra = []
        await AsyncStorage.getItem('zcarr').then(resp => {
            let objzc = JSON.parse(resp)
            arra = objzc
            // this.setState({productList:sdpzc,prodert:sdpzc})     
        })
        // console.log("8888866666",arra);
        Picker.init({
            pickerData: arra,
            selectedValue: ["服装"],
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerTitleText: '请选择',
            onPickerConfirm: data => {
                this.setState({ lbtext: data })
                // console.log('选择的值为：', data);
            },
            onPickerCancel: () => {
                console.log('取消');
            }
        });
        Picker.show()

    }

    // 收入类别设置
    async lbszsr() {
        let arra = []
        await AsyncStorage.getItem('category').then(resp => {
            let objzc = JSON.parse(resp)
            arra = objzc
            // this.setState({productList:sdpzc,prodert:sdpzc})     
        })
        // console.log("8888866666",arra);
        Picker.init({
            pickerData: arra,
            selectedValue: ["工资"],
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerTitleText: '请选择',
            onPickerConfirm: data => {
                this.setState({ lbtextsr: data })
                // console.log('选择的值为：', data);
            },
            onPickerCancel: () => {
                console.log('取消');
            }
        });
        Picker.show()
    }

    // 确定
    async payzc() {
        
        if (this.state.isalgin) {
            if (this.state.payzcprice != '' && this.state.lbtext[0] != '' && this.state.currentDate != '' && this.state.payzcremeakr != '') {
                let arra = []
                const value = await AsyncStorage.getItem('zcpay');
              if(value !== null){
                arra = JSON.parse(value);
                // console.log(value);
              }
            //   let ad =[]
                arra.push({ zc: [this.state.payzcprice, this.state.lbtext[0], this.state.currentDate, this.state.payzcremeakr,this.state.isalgin,this.format()] })
                await AsyncStorage.setItem('zcpay', JSON.stringify(arra));
              Alert.alert('提示', '添加成功');
              console.log(arra,"77777777777777799999999999");
                
            } else {
                Alert.alert("提示", "填写不能为空")
            }
        } else if (this.state.isalgintow) {
            if (this.state.paysrprice != '' && this.state.lbtextsr[0] != "" && this.state.currentDate != '' && this.state.paysrremeakr != '') {
                let arra = []
                const value = await AsyncStorage.getItem('srpay');
              if(value !== null){
                arra = JSON.parse(value);
                console.log(value);
              }
            //   let ap=[]
                arra.push({ sr: [this.state.paysrprice, this.state.lbtextsr[0], this.state.currentDate, this.state.paysrremeakr,this.state.isalgin,this.format()] })
                await AsyncStorage.setItem('srpay', JSON.stringify(arra));
                Alert.alert('提示', '添加成功');
                console.log(arra,"收入");
                  
            }else{
                Alert.alert("提示", "填写不能为空")
            }
        }
    
    }
    escdel(){
        this.refs.money.clear()
        this.refs.reamke.clear()
        this.setState({currentDate:this._getCurrentDate()})
        this.setState({lbtext:'请选择类别',lbtextsr:"请选择类别"})
    }
    addCart() {
        this.setState({ isalgin: true, isalgintow: false, lbtext: "请选择类别", payzcprice: '' })
        // this.setState({})
        this.refs.money.clear()
        this.refs.reamke.clear()
    }
    addCartd() {
        this.setState({ isalgintow: true, isalgin: false, lbtextsr: '请选择类别', paysrprice: '' })
        this.refs.money.clear()
        this.refs.reamke.clear()
    }


    componentDidMount(){
        this._unsubscribe = this.props.navigation.addListener('focus',()=>{
            this.escdel()
            console.log("1111", );
        })


    }
    componentWillUnmount(){
        this._unsubscribe()
    }





    render() {
        return (<ScrollView>
            {/* 头部 */}
            <View style={styles.header}>
                <Text style={styles.textone}>记账</Text>
                <View style={styles.headerbottoms}>
                    <Text style={this.state.isalgin ? styles.textleft : styles.textright} onPress={() => this.addCart()}>支出</Text>
                    <Text style={this.state.isalgintow ? styles.textleft : styles.textright} onPress={() => this.addCartd()}>收入</Text>
                </View>
            </View>
            {/* zhongjian  */}
            <View>
                <View style={styles.vieinput}>
                    <Icon name="creative-commons-noncommercial-us" type="entypo" style={styles.textico} />
                    <TextInput style={styles.inputc} keyboardType="numeric" placeholder="请输入金额" onChangeText={this.state.isalgin ? (value) => { this.setState({ payzcprice: value }) } : (value) => { this.setState({ paysrprice: value }) }} ref="money" />
                </View>
                <View style={styles.vieinput}>
                    <Icon name="appstore-o" type="antdesign" style={styles.textico} />
                    <TouchableOpacity onPress={this.state.isalgin ? this.lbszpicr : this.lbszsr}>
                        <Text style={styles.textmony}>{this.state.isalgin ? this.state.lbtext : this.state.lbtextsr}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.vieinput}>
                    <Icon name="calendar" type="antdesign" style={styles.textico} />
                    <TouchableOpacity onPress={() => this._showDatePicker()}>
                        <Text style={styles.textmony}>{this.state.currentDate}</Text>
                    </TouchableOpacity>

                    {/* <Button title="请选择" onPress={this.setc}></Button> */}
                </View>
                <View style={styles.vieinput}>
                    <Icon name="form" type="antdesign" style={styles.textico} />
                    <TextInput style={styles.inputc} placeholder="说明" onChangeText={this.state.isalgin ? (value) => { this.setState({ payzcremeakr: value }) } : (value) => { this.setState({ paysrremeakr: value }) }} ref="reamke" />
                </View>
            </View>
            <View style={styles.buttt}>
                <View style={styles.buttone}>
                    <Button title="确定" color="#FFDA44" onPress={this.payzc} />
                </View>
                <View style={styles.buttone}>
                    <Button title="取消" color="#ccc" onPress={this.escdel} />
                </View>
            </View>
        </ScrollView>);
    }
}

const styles = StyleSheet.create({
    header: {
        height: 120,
        backgroundColor: '#FFDA44',
    },
    headerbottoms: {
        flexDirection: 'row',
        marginTop: 14,
        marginLeft: 50
    },
    textone: {
        fontSize: 20,
        marginLeft: 150,
        marginTop: 30
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
    inputc: {
        width: 350,
        marginLeft: 4,
    },
    textico: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
    textmony: {
        // color:"#666",
        fontSize: 14,
        marginTop: 10,
        marginLeft: 4,
        paddingLeft: 6
    },
    vieinput: {
        height: 50,
        flexDirection: "row",
        borderWidth: 1,
        borderStyle: "solid",
        borderTopColor: "#fff",
        borderLeftColor: "#fff",
        borderRightColor: "#fff",
        borderBottomColor: "#ccc",
    },
    buttt: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20
    },
    buttone: {
        width: 150,
    },

})

export default tilly;