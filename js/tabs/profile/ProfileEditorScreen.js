import React from 'react';

import {
  Image,
  Text,
  View,
  StyleSheet,
  ListView,
  TouchableOpacity,
  TextInput,
  Switch,
  Modal,
  DatePickerIOS,
  DatePickerAndroid,
  ScrollView
} from 'react-native';
import moment from 'moment';
import Picker from 'react-native-picker';

import PureListView from '../../common/PureListView';
import CircleImage from '../../common/CircleImage';
import {toHumanNumber, random, mapSource} from '../../common/utils';
import {changePublicProfile, clearSaveState} from '../../actions/changeProfile';

import CircleImageWithCategory from './CircleImageWithCategory';
import NavBar from './NavBar';
import {styles as commonStyles, colors as commonColors} from './common';

import ProfileHeader from './ProfileHeader';
import DatePickerDialog from './DatePickerDialog';

import {connect} from 'react-redux'

class ProfileEditorScreen extends React.Component {
  constructor(...args) {
    super(...args);
    this.props.clearSaveState();
    this.state = {
      name: this.props.name,
      birthDayDate: this.props.birthDayDate,
      sex: this.props.sex
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.saved === true) {
      this.props.onBackPress && this.props.onBackPress();
    }
  }

  render() {
    return (<View style={commonStyles.listViewContainer}>
      <DatePickerDialog ref="datePicker"/>
      <NavBar
        title="แก้ไขข้อมูล"
        renderRightMenu={() => {
          return (<Image
                source={require('./img/icons/ok.png')}
                style={{
                  height: 25,
                  width: 25,
                  resizeMode: 'contain'
                }}
              />)
        }}
        onLeftPress={() => this.props.onBackPress && this.props.onBackPress()}
        onRightPress={() => this.props.changePublicProfile(this.state.name, this.state.birthDayDate, this.state.sex)}
        >
      </NavBar>
      <ProfileHeader user={{}}>
        <View style={styles.rowDirection}>
          <TouchableOpacity style={styles.whiteBorder}>
            <Text style={styles.whiteText}>เปลี่ยนรูปโปรไฟล์</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.whiteBorder}>
            <Text style={styles.whiteText}>เปลี่ยนรูปพื้นหลัง</Text>
          </TouchableOpacity>
        </View>
      </ProfileHeader>

      <View style={{flex: 2}}>
        <View style={[styles.editorBox, {marginVertical: 15}]}>
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>ชื่อ</Text>
            </View>
            <View style={[styles.input, styles.bottomBorderGrey]}>
              <TextInput
                onChangeText={(name) => this.setState({name})}
                style={[styles.textGrey, {flex: 1}]}
                autoCapitalize='none'
                value={this.state.name}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>เพศ</Text>
            </View>
            <TouchableOpacity style={[styles.input, styles.bottomBorderGrey]} onPress={() => this.openSexPicker()}>
              <Text style={styles.textGrey}>{this.state.sex === 'M' ? 'ชาย' : (this.state.sex === 'F' ? 'หญิง' : 'ไม่ระบุ')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>เกิด</Text>
            </View>
            <TouchableOpacity style={styles.input} onPress={() => this.openDatePicker()}>
              <Text style={styles.textGrey}>{!this.state.birthDayDate ? 'ไม่ระบุ' : moment(this.state.birthDayDate).format('LL')}</Text>
            </TouchableOpacity>
          </View>
        </View>


        <View style={styles.editorBox2}>
          <TouchableOpacity style={styles.row2}>
            <Text style={styles.label2}>เชื่อมต่อ Facebook</Text>
            <View>
              <Switch value={true}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row2} onPress={() => this.props.navigator.push({page: 'change-email'})}>
            <Text style={styles.label2}>เปลี่ยน Email</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row2} onPress={() => this.props.navigator.push({page: 'change-password'})}>
            <Text style={styles.label2}>เปลี่ยน Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>);
  }

  openDatePicker() {
    this.refs.datePicker.open().then(date => {
      this.setState({
        birthDayDate: date
      })
    });
  }

  openSexPicker() {
    Picker.init({
      pickerData: [
        'ไม่ระบุ',
        'ชาย',
        'หญิง'
      ],
      selectedValue: [this.state.sex === 'M' ? 'ชาย' : (this.state.sex === 'F' ? 'หญิง' : 'ไม่ระบุ')],
      pickerConfirmBtnText: 'OK',
      pickerCancelBtnText: 'CANCEL',
      pickerTitleText: 'เพศ',
      onPickerConfirm: (data) => {
        let sex;
        if (data[0] === 'ชาย') {
          sex = 'M';
        }
        if (data[0] === 'หญิง') {
          sex = 'F';
        }
        if (data[0] === 'ไม่ระบุ') {
          sex = null;
        }
        this.setState({
          sex
        });
      }
    });
    Picker.show();
  }
}

const styles = StyleSheet.create({
  rowDirection: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginTop: 25
  },
  whiteBorder: {
    padding: 3,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    marginHorizontal: 5
  },
  whiteText: {
    color: 'white',
    fontSize: 10
  },
  editorBox: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: commonColors.greyBorder
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  labelContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontSize: 15
  },
  input: {
    flex: 5,
    justifyContent: 'center',
    height: 50
  },
  editorBox2: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: commonColors.greyBorder
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: commonColors.greyBorder
  },
  label2: {
    fontSize: 15,
    flex: 1
  },
  bottomBorderGrey: {
    borderBottomWidth: 1,
    borderColor: commonColors.greyBorder
  },
  textGrey: {
    color: commonColors.textGrey
  }
});

const select = state => ({
  name: state.user.name,
  email: state.user.email,
  sex: state.user.sex,
  birthDayDate: state.user.birthDayDate,
  saving: state.user.savingProfile,
  saved: state.user.savedProfile
});

const actionsMaping = {
  changePublicProfile,
  clearSaveState
};

export default connect(select, actionsMaping)(ProfileEditorScreen);
