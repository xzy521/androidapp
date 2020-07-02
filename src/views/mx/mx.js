import React from 'react';
import { ScrollView, Text, View, StyleSheet, FlatList } from 'react-native';
import { SearchBar, ListItem, Icon } from 'react-native-elements';
import Picker from 'react-native-picker'
import AsyncStorage from '@react-native-community/async-storage';
import Swipeout from 'react-native-swipeout';
import { ScreenStack } from 'react-native-screens';

class mx extends React.Component {
    constructor() {
        super();
        this.state = {
            currentDate: this._getCurrentDate(),
            yeraa: this._getCurrentYear(),
            monter: "06",
            payzc: '',
            paysr: '',
            prdort: [],
            list: [],
        }
        this._getCurrentDate = this._getCurrentDate.bind(this)
        this._createDateData = this._createDateData.bind(this)
        this._showDatePicker = this._showDatePicker.bind(this)
        this._getCurrentYear = this._getCurrentYear.bind(this)
        this._getCurrentmoth = this._getCurrentmoth.bind(this)
        this.sads = this.sads.bind(this)
    }
    async sads(i) {
        // console.log("12456",this.state.list,i);
        let sket = this.state.list.filter(item => item[5] !== i)
        let zcarr = []
        let srarr = []
        sket.map(item => {
            if (item[4]) {
                zcarr.push(item)
            } else {
                srarr.push(item)
            }
        })
        let sck = []
        let kss = []
        zcarr.map(item => {
            sck.push({ "zc": item })
        })
        srarr.map(item => {
            kss.push({ "sr": item })
        })
        await AsyncStorage.setItem('srpay', JSON.stringify(kss));
        await AsyncStorage.setItem('zcpay', JSON.stringify(sck));
        // console.log(zcarr,srarr,"7777777777",sck,kss);
        this.mxdata()

    }

    // 当前日期时间
    _getCurrentDate() {
        var currDate = new Date()
        var year = currDate.getFullYear()
        var month = (currDate.getMonth() + 1).toString()
        month = month.padStart(2, '0')
        var dateDay = currDate.getDate().toString()
        dateDay = dateDay.padStart(2, '0')
        let time = year + '-' + month
        // var month = parseInt(dateStr.substring(5, 7))
        return time;

    }
    _getCurrentYear() {
        var currDate = new Date()
        var year = currDate.getFullYear()
        var month = (currDate.getMonth() + 1).toString()
        month = month.padStart(2, '0')
        var dateDay = currDate.getDate().toString()
        dateDay = dateDay.padStart(2, '0')
        let time = year + '-' + month + '-' + dateDay
        // var monthss = parseInt(dateStr.substring(5, 7))
        return year;

    }
    _getCurrentmoth() {
        var currDate = new Date()
        var year = currDate.getFullYear()
        var month = (currDate.getMonth() + 1).toString()
        month = month.padStart(2, '0')
        var dateDay = currDate.getDate().toString()
        dateDay = dateDay.padStart(2, '0')
        let time = year + '-' + month + '-' + dateDay
        // var monthss = parseInt(dateStr.substring(5, 7))
        return month;

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
                    // Leap day for years that are divisible by 4, such as 2000, 2004
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


    async _showDatePicker() {
        let dat = [
            [2017, 2018, 2019, 2020],
            ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        ]
        var year = ''
        var month = ''
        // var day = ''
        var dateStr = this.state.currentDate
        //console.log('dateStr',dateStr)
        year = dateStr.substring(0, 4)
        month = parseInt(dateStr.substring(5, 7))
        // day = parseInt(dateStr.substring(8, 10))
        Picker.init({
            pickerTitleText: '时间选择',
            pickerCancelBtnText: '取消',
            pickerConfirmBtnText: '确定',
            selectedValue: [this.state.yeraa, this.state.monter],
            pickerBg: [255, 255, 255, 1],
            pickerData: dat,
            pickerFontColor: [33, 33, 33, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                var year = pickedValue[0].substring(0, 4)
                var month = pickedValue[1].substring(0, 2)
                let str = month
                let yess = year
                this.setState({
                    monter: str,
                    yeraa: yess
                })
                let arrpp = this.state.list.filter(item => item[2].substring(5, 7).includes(this.state.monter) && item[2].substring(0, 4).includes(this.state.yeraa))
                console.log("aaaaaaaaaaa", arrpp);
                let s = 0
                let m = 0
                arrpp.map(item => {
                    if (item[4]) {
                        s += parseFloat(item[0])
                    } else {
                        m += parseFloat(item[0])
                    }

                })
                this.setState({ prdort: arrpp, paysr: m, payzc: s })
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
                // console.log('date', pickedValue, pickedIndex);
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
                // console.log('date', pickedValue, pickedIndex);
                let ys = pickedValue[0].substring(0, 4)
                let months = pickedValue[1].substring(0, 1)
                // console.log("aaaa", months, "bbbbb", ys);

                //    this.setState({list:arrst})

            }
        });



        Picker.show();
    }

    // 从本地拿记账明细

    async mxdata() {
        let arra = []
        let arrst = []
        await AsyncStorage.getItem('zcpay').then(resp => {
            let objzc = JSON.parse(resp)

            arra = objzc
            arra.map(item => {
                // console.log(item.zc);
                arrst.push(item.zc)
            })
        })
        console.log(arra);

        let arrb = []
        await AsyncStorage.getItem('srpay').then(resp => {
            let objzc = JSON.parse(resp)

            arrb = objzc
            arrb.map(item => {
                // console.log(item.sr,"sr");
                arrst.push(item.sr)

            })
            // console.log("收入总额",s);

        })

        let ammp = arrst.filter(item => item[2].includes(this.state.yeraa) && item[2].includes("06"))
        let s = 0
        let m = 0
        ammp.map(item => {
            if (item[4]) {
                s += parseFloat(item[0])
            } else {
                m += parseFloat(item[0])
            }

        })
        // console.log(arrst,"5555555",ammp);
        this.setState({ paysr: m, payzc: s })
        this.setState({ prdort: ammp, monter: "06" })
        this.setState({ list: arrst })
        // console.log(arrb);
    }


    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.mxdata()
            // console.log("1111");
        })


    }
    componentWillUnmount() {
        this._unsubscribe()
    }





    render() {
        return (<>
            {/* 头部 */}
            <View style={styless.header}>
                <Text style={styless.selfjz}>个人记账</Text>
                <View style={styless.bootview}>
                    <View>
                        <Text style={styless.toptext} onPress={this._showDatePicker} >{this.state.yeraa}年</Text>
                        <View style={styless.montons}>
                            <Text style={styless.montone} onPress={this._showDatePicker}>{this.state.monter}月</Text>
                            <Icon name="caretdown" type="antdesign" size={18} style={styless.montico} onPress={this._showDatePicker} />
                        </View>

                    </View>
                    <View>
                        <Text style={styless.toptext}>收入</Text>
                        <Text style={styless.moen}>{this.state.paysr}</Text>
                    </View>
                    <View>
                        <Text style={styless.toptext}>支出</Text>
                        <Text style={styless.moen}>{this.state.payzc}</Text>
                    </View>
                </View>

            </View>
            {/*主要内容  */}
            <FlatList
                data={this.state.prdort}
                renderItem={({ item }) => {
                    return (
                        <View >
                            <View style={styless.centertop}>
                                <Text style={styless.textone}>{item[2]}</Text>
                                <View style={styless.rightvieve}>
                                    <Text style={styless.textones}>收入:{item[4] ? null : item[0]}</Text>
                                    <Text style={styless.textones}>支出:{item[4] ? item[0] : null}</Text>
                                </View>

                            </View>
                            <Swipeout right={[
                                {
                                    text: '删除',
                                    backgroundColor: "red",
                                    onPress: () => {
                                        this.sads(item[5])
                                    }
                                }
                            ]} style={styless.swip} >
                                <View style={styless.cetern}>
                                    <Text style={styless.reamker}>【{item[1]}】{item[3]}</Text>
                                    <Text style={styless.price}>{item[4] ? -item[0] : item[0]}</Text>
                                </View>

                            </Swipeout>
                        </View>)

                }}
                keyExtractor={index => index + ""}

            />
        </>);
    }
}


const styless = StyleSheet.create({
    header: {
        height: 140,
        backgroundColor: "#FFDA44",
    },
    selfjz: {
        fontSize: 18,
        marginLeft: 140,
        marginTop: 30
    },
    bootview: {
        flexDirection: "row",
        justifyContent: 'space-around',
        marginTop: 20
    },
    toptext: {
        color: '#666'
    },
    montons: {
        flexDirection: 'row',
        marginTop: 5
    },
    montone: {
        fontSize: 18
    },
    moen: {
        marginTop: 10
    },
    montico: {
        marginTop: 4
    },
    centertop: {
        flexDirection: "row",
        height: 35,
        borderBottomWidth: 1,
        borderStyle: "solid",
        borderColor: "#ccc",
        justifyContent: "space-between",
        paddingTop: 5
    },
    cetern: {
        flexDirection: 'row',
        height: 50,
        borderBottomWidth: 1,
        borderStyle: "solid",
        borderColor: "#ccc",
        paddingTop: 16,
        justifyContent: "space-between"
    },
    rightvieve: {
        flexDirection: "row", marginRight: 20
    },
    textone: {
        color: "#9D9D9D",
        paddingLeft: 10
    },
    textones: {
        color: "#9D9D9D",
        paddingLeft: 10
    },
    reamker: {
        paddingLeft: 10,
        color: "#555555"
    },
    price: {
        marginRight: 20,
        color: '#555555'
    },
    swip: {
        backgroundColor: "#fff"
    }
})

export default mx;