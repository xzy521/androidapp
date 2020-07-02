import React from 'react';
import { ScrollView, Text, View, StyleSheet, FlatList } from 'react-native';
import { SearchBar, ListItem, Icon } from 'react-native-elements';
import Picker from 'react-native-picker'
import AsyncStorage from '@react-native-community/async-storage';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';


class zd extends React.Component {
    constructor() {
        super();
        this.state = {
            yearr: '2020',
            money: '',
            payzc: '',
            paysr: '',
            arralllist: '',
            prodrt: [],
        }
        this.yearselect = this.yearselect.bind(this)
        this.toScreen = this.toScreen.bind(this)
        this.addat = this.addat.bind(this)
    }

    toScreen(routeName) {
        this.props.navigation.navigate(routeName);
    }

    // 拿到本地的数据
    async addat() {
        let arra = []
        let arrst = []
        await AsyncStorage.getItem('zcpay').then(resp => {
            let objzc = JSON.parse(resp)
            arra = objzc
            arra.map(item => {
                arrst.push(item.zc)
            })
        })
        let arrb = []
        await AsyncStorage.getItem('srpay').then(resp => {
            let objzc = JSON.parse(resp)
            arrb = objzc
            arrb.map(item => {
                // console.log(item.sr,"sr");
                arrst.push(item.sr)
            })
        })
        let ammp = arrst.filter(item => item[2].includes(this.state.yearr))
        this.setState({ arralllist: arrst })
        let acd = []
        for (let i = 1; i <= 12; i++) {
            let x = ''
            if (x = i) {
                let sop = ammp.filter(item => item[2].substring(5, 7).includes(x))
                let soo = 0
                let poo = 0
                let jyoo = 0
                let keys = ''
                sop.map(item => {
                   
                    if (item[4]) {
                        keys = item[5]
                        soo += parseFloat(item[0])
                    } else {
                        keys = item[5]
                        poo += parseFloat(item[0])
                    }
                    jyoo = poo - soo
                })
                acd.push({ "m": i, "payzc": soo, "paysr": poo, "jyoo": jyoo ,"key":keys})
            }
        }
        this.setState({ prodrt: acd })

        let s = 0
        let m = 0
        ammp.map(item => {
            if (item[4]) {
                s += parseFloat(item[0])
            } else {
                m += parseFloat(item[0])
            }
        })
        this.setState({ payzc: s, paysr: m, money: m - s })

    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.addat()
            // console.log("1111");
        })


    }
    componentWillUnmount() {
        this._unsubscribe()
    }


    yearselect() {
        let data = []
        for (let i = 1990; i <= 2020; i++) {
            data.push(i);
        }
        Picker.init({
            pickerData: data,
            selectedValue: [2020],
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerTitleText: '请选择年',
            onPickerConfirm: (pickedValue, pickedIndex) => {
                let year = pickedValue[0].substring(0, 4)
                this.setState({ yearr: year })
                let ammp = this.state.arralllist.filter(item => item[2].includes(year))
                // console.log(ammp,"ammp");
                let s = 0
                let m = 0
                ammp.map(item => {
                    if (item[4]) {
                        s += parseFloat(item[0])
                    } else {
                        m += parseFloat(item[0])
                    }
                })
                this.setState({ payzc: s, paysr: m, money: m - s })
                let acd = []
                for (let i = 1; i <= 12; i++) {
                    // let montarr =  ammp.filter(item => item[2].substring(5,7).includes(i))
                    // console.log(montarr,i,"0000");
                    let x = ''

                    if (x = i) {
                        let sop = ammp.filter(item => item[2].substring(5, 7).includes(x))
                        let soo = 0
                        let poo = 0
                        let jyoo = 0
                        sop.map(item => {

                            if (item[4]) {
                                soo += parseFloat(item[0])
                            } else {
                                poo += parseFloat(item[0])
                            }
                            jyoo = poo - soo
                        })
                        acd.push({ "m": i, "payzc": soo, "paysr": poo, "jyoo": jyoo })
                    }
                }
                this.setState({ prodrt: acd })

            },
            onPickerCancel: () => {
                console.log('取消');
            }
        }

        );

        Picker.show();
    }

    render() {
        return (
            <>
                {/* 头部 */}
                <View style={styless.header}>
                    <View style={styless.sss}>
                        <Icon name="left" type="antdesign" onPress={() => this.toScreen("find")} />
                        <View style={styless.onellt}>
                            <Text style={styless.onetext}>账单</Text>
                            <Text style={styless.onetexttow} onPress={this.yearselect}>{this.state.yearr}年</Text>
                        </View>
                    </View>
                    <Text style={styless.jy}>结余</Text>
                    <Text style={styless.money}>{this.state.money}￥</Text>
                    <View style={styless.headerbottom}>
                        <View style={styless.leftsr}>
                            <Text style={styless.srtext}>收入</Text>
                            <Text style={styless.moensr}>{this.state.paysr}</Text>
                        </View>

                        <View style={styless.rightzc}>
                            <Text style={styless.srtext}>支出</Text>
                            <Text style={styless.moensr}>{this.state.payzc}</Text>
                        </View>

                    </View>
                </View>
                {/* 下面内容 */}
                <View style={styless.centheader}>
                    <Text>月份</Text>
                    <Text>收入</Text>
                    <Text>支出</Text>
                    <Text>结余</Text>
                </View>
                <FlatList
                    data={this.state.prodrt}
                    renderItem={({ item }) => {
                        return (
                            <View style={styless.listv} >
                                <Text style={styless.textones}>{item.m}</Text>
                                <Text style={styless.textones}>{item.paysr}</Text>
                                <Text style={styless.textones}>{item.payzc}</Text>
                                <Text style={styless.textones}>{item.jyoo}</Text>
                            </View>
                        )
                    }}
                    keyExtractor={(item)=>item.m}

                />
            </>
        );
    }
}

const styless = StyleSheet.create({
    header: {
        height: 150,
        backgroundColor: '#FFDA44',
        alignItems: 'center'
    },
    onellt: {
        flexDirection: 'row',
    },
    onetext: {
        fontSize: 18,
        position: 'relative',
        left: 125
    },
    sss: {
        flexDirection: "row",
        marginLeft: -270
    },
    onetexttow: {
        fontSize: 16,
        position: 'absolute',
        left: 260,
        marginTop: 2
    },
    jy: {
        fontSize: 14,
        color: "#666",
        marginTop: 20,
    },
    money: {
        fontSize: 18,
        alignItems: 'center',
        marginTop: 4,
    },
    headerbottom: {
        flexDirection: 'row',
        marginTop: 14
    },
    leftsr: {
        flexDirection: "row",
        width: 130,
        height: 30,
        // marginLeft:-60,
        paddingTop: 3,
        borderWidth: 1,
        borderTopColor: "#FFDA44", borderLeftColor: "#FFDA44", borderBottomColor: "#FFDA44",
        borderRightColor: "#666"
    },
    rightzc: {
        flexDirection: "row",
        width: 80,
        height: 30,
        marginLeft: 45,
        paddingTop: 3,
    },
    srtext: {
        color: "#666",
        marginTop: 4
    },
    moensr: {
        fontSize: 18
    },
    centheader: {
        flexDirection: 'row',
        height: 30,
        justifyContent: "space-around",
        borderBottomWidth: 1,
        borderStyle: "solid",
        borderBottomColor: "#ccc"
    },
    listv: {
        flexDirection: 'row',
        justifyContent: "space-around",
        backgroundColor: "#E9E8E6",
        height: 30,
        marginTop: 5,
        paddingTop: 5
    },
    textones: {
        width: 100,

        textAlign: "center",

    }
})


export default zd;