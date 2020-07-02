import React from 'react';
import { ScrollView, Text, View, StyleSheet ,FlatList} from 'react-native';
import { SearchBar, ListItem, Icon, Slider } from 'react-native-elements';
import { Echarts } from 'react-native-secharts'
import AsyncStorage from '@react-native-community/async-storage';
import Picker from 'react-native-picker'

class picture extends React.Component {
    constructor() {
        super();
        this.state = {
            isalgin: true,
            isalgintow: false,
            timeda: "2020年06月",
            zcdate: [],
            srdate: [],
            abcc: [],
            abccsr: [],
            monytt: [],
            monyttsr: [],
            alldata: [],
            moneyzcd: 0,
            moneysrd: 0,
            currentDate: this._getCurrentDate(),
        }
        this.addCart = this.addCart.bind(this)
        this.addCartd = this.addCartd.bind(this)
        this._showDatePicker = this._showDatePicker.bind(this)
        this._getCurrentDate = this._getCurrentDate.bind(this)
    }


    async datain() {
        let arra = []
        let arrst = []
        let arrall = []
        await AsyncStorage.getItem('zcpay').then(resp => {
            let objzc = JSON.parse(resp)
            arra = objzc
            let moneyzc = 0
            arra.map(item => { arrall.push(item.zc) })
            let nn = arra.filter(item => item.zc[2].substring(5, 7).includes("06") && item.zc[2].substring(0, 4).includes("2020"))
            // console.log("555",nn);
            nn.map(item => {
                // console.log(item.zc);
                arrst.push(item.zc)
                moneyzc += parseFloat(item.zc[0])
            })
            // console.log("arrst", arrst);
            this.setState({ zcdate: arrst, moneyzcd: moneyzc })

            // console.log(abc,"abc");

        })
        let abc = []
        let mone = []
        this.state.zcdate.map(item => {
            abc.push(item[1])
            mone.push({ "value": item[0], "name": item[1] })
        })
        let arrb = []
        let arrlist = []
        await AsyncStorage.getItem('srpay').then(resp => {
            let objzc = JSON.parse(resp)
            arrb = objzc
            let spp = 0
            arrb.map(item => {
                // console.log(item.sr,"sr");
                arrall.push(item.sr)
            })
            let bbv = arrb.filter(item => item.sr[2].substring(5, 7).includes("06") && item.sr[2].substring(0, 4).includes("2020"))
            bbv.map(item => {
                // console.log(item.sr,"sr");
                arrlist.push(item.sr)
                spp += parseFloat(item.sr[0])
            })
            // console.log("arrst", spp);
            this.setState({ srdate: arrlist, moneysrd: spp })
        })
        let abcsr = []
        let monesr = []
        this.state.srdate.map(item => {
            abcsr.push(item[1])
            monesr.push({ "value": item[0], "name": item[1] })
        })
        this.setState({ abcc: abc, monytt: mone,abccsr: abcsr, monyttsr: monesr,alldata: arrall })
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.datain()
            // this.setState({timeda:"2020年06月"})
        })


    }
    componentWillUnmount() {
        this._unsubscribe()
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

    // 时间pick
    async _showDatePicker() {
        let dat = [
            [2017, 2018, 2019, 2020],
            ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        ]
        let year = ''
        let month = ''
        // var day = ''
        var dateStr = this.state.currentDate
        //console.log('dateStr',dateStr)
        year = dateStr.substring(0, 4)
        month = dateStr.substring(5, 7)
        // console.log(month,"444");

        // day = parseInt(dateStr.substring(8, 10))
        Picker.init({
            pickerTitleText: '时间选择',
            pickerCancelBtnText: '取消',
            pickerConfirmBtnText: '确定',
            selectedValue: [year, month],
            pickerBg: [255, 255, 255, 1],
            pickerData: dat,
            pickerFontColor: [33, 33, 33, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                var year = pickedValue[0].substring(0, 4)
                var month = pickedValue[1].substring(0, 2)
                let tiem = `${year}年${month}月`
                this.setState({ timeda: tiem })
                let ppp = this.state.alldata.filter(item => item[2].substring(5, 7).includes(month) && item[2].substring(0, 4).includes(year))
                let lebzc = []
                let lebsr = []
                let tbzc = []
                let tbsr = []
                let soo = 0
                let ppps = 0
                ppp.map(item => {

                    if (item[4]) {
                        soo += parseFloat(item[0])
                        lebzc.push(item[1])
                        tbzc.push({ "value": item[0], "name": item[1] })
                    } else {
                        ppps += parseFloat(item[0])
                        lebsr.push(item[1])
                        tbsr.push({ "value": item[0], "name": item[1] })
                    }

                    // console.log(item,"6666");
                })
                this.setState({ abcc: lebzc, monytt: tbzc, moneyzcd: soo })
                this.setState({ abccsr: lebsr, monyttsr: tbsr, moneysrd: ppps })

            },
            onPickerCancel: (pickedValue, pickedIndex) => {
                // console.log('date', pickedValue, pickedIndex);
            },
            onPickerSelect: (pickedValue, pickedIndex) => {

            }
        });



        Picker.show();
    }




    addCart() {
        this.setState({ isalgin: true, isalgintow: false, prodert: this.state.productList })
        // console.log("addcart");

        // this.setState({})
    }
    addCartd() {
        this.setState({ isalgintow: true, isalgin: false, prodert: this.state.prddd })
        // console.log('addcarted');

    }


    render() {


        const option = {
            title: {
                text: ''
            },
            tooltip: {},
            legend: {
                // orient: 'vertical',
                // left: 'left',
                data: this.state.isalgin ? this.state.abcc : this.state.abccsr
            },
            series: [{
                name: this.state.isalgin ? this.state.abcc : this.state.abccsr,
                type: 'pie',
                radius: '60%',
                center: ['50%', '60%'],
                data: this.state.isalgin ? this.state.monytt : this.state.monyttsr
            }]
        };
        return (<>
            {/* 头部 */}
            <View style={styles.header}>
                <View style={styles.sss}>
                    <Text style={styles.textone} onPress={this.aaaaaaaaa}>分析报告</Text>
                </View>

                <View style={styles.headerbottoms}>
                    <Text style={this.state.isalgin ? styles.textleft : styles.textright} onPress={() => this.addCart()}>支出</Text>
                    <Text style={this.state.isalgintow ? styles.textleft : styles.textright} onPress={() => this.addCartd()}>收入</Text>
                </View>
                <View style={styles.bottime}>
                    <Text style={styles.texttime} onPress={this._showDatePicker}>{this.state.timeda}</Text>
                    <Icon name="caretdown" type="antdesign" size={18} color="#555" onPress={this._showDatePicker} />
                </View>
            </View>
            <View >
                <Echarts option={option} height={250} />
            </View>
            <View style={styles.sbhj} >
                <Text style={styles.sty}>合计:{this.state.isalgin ? this.state.moneyzcd : this.state.moneysrd}</Text>
            </View>

            <FlatList
                data={ this.state.isalgin ? this.state.monytt : this.state.monyttsr}
                renderItem={({ item ,index }) => {
                    // console.log('item:', item)
                    return (<View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
                    <Slider
                        value={item.value}
                        maximumTrackTintColor={"red"}
                        // maximumValue={120}
                        minimumValue={1}
                        disabled={true}
                    />
                    <Text>{item.name}: {item.value}</Text>
                </View>)
                }
                
                
                
                }
                keyExtractor={(item, index) => index + ''}
            />
        </>);
    }
}


const styles = StyleSheet.create({
    header: {
        height: 150,
        backgroundColor: '#FFDA44',
    },
    sss: {
        flexDirection: 'row',
        marginTop: 20
    },
    textone: {
        fontSize: 20,
        marginLeft: 130,
    },
    headerbottoms: {
        flexDirection: 'row',
        marginTop: 28,
        marginLeft: 50
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
    bottime: {
        flexDirection: "row",
        marginLeft: 126,
        marginTop: 10
    },
    texttime: {
        color: "#555"
    },
    sbhj: {
        width: 120,
        height: 30,
        backgroundColor: "#FFDA44",
        borderRadius: 5, marginLeft: 120
    },
    sty: {
        textAlign: "center",
        paddingTop: 5
    }

})


export default picture;