import React from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Switch,
  Alert,
  Modal
} from 'react-native';
import moment from 'moment';
import ImagePicker from 'react-native-image-picker';
import ModalPicker from 'react-native-modal-picker';

import NavBar from './NavBar';
import { styles as commonStyles } from '../common';
import { colors as commonColors } from '../../../common/styles';

import ProfileHeader from './ProfileHeader';
import DatePickerDialog from './DatePickerDialog';
import ModalSpinner from '../../../common/ModalSpinner';
import TextInput from '../../../common/TextInput';

const sexPickerData = [
    { key: 0, label: 'ชาย', value: 'M' },
    { key: 1, label: 'หญิง', value: 'F' },
    { key: 2, label: 'ไม่ระบุ', value: null },
];

const styles = StyleSheet.create({
  rowDirection: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginTop: 25,
  },
  whiteBorder: {
    padding: 3,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  whiteText: {
    color: 'white',
    fontSize: 10,
  },
  editorBox: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: commonColors.greyBorder,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
  },
  input: {
    flex: 5,
    justifyContent: 'center',
    height: 50,
  },
  editorBox2: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: commonColors.greyBorder,
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: commonColors.greyBorder,
  },
  label2: {
    fontSize: 15,
    flex: 1,
  },
  bottomBorderGrey: {
    borderBottomWidth: 1,
    borderColor: commonColors.greyBorder,
  },
  textGrey: {
    color: commonColors.textGrey,
  },
});

export const OKButton = () => (<Image
  source={require('../img/icons/ok.png')}
  style={{
    height: 25,
    width: 25,
    resizeMode: 'contain',
  }}
/>);

class ProfileEditorScreen extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      name: this.props.name,
      birthDayDate: this.props.birthDayDate,
      sex: this.props.sex,
      changedProfilePicture: null,
      changedProfileCover: null,
      savingProfile: false,
      linkingFacebook: false,
      visibleSexPicker: false,
    };

    this.onToggleFacebookLink = this.onToggleFacebookLink.bind(this);
  }

  onToggleFacebookLink() {
    this.setState({
      linkingFacebook: true,
    });
    if (this.props.facebookLinked) {
      return this.props.unlinkFacebook().then(() => {
        this.setState({
          linkingFacebook: false,
        });
      }).catch((error) => {
        Alert.alert('Error', error.message, [
          { text: 'OK', onPress: () => this.setState({ linkingFacebook: false }) },
        ]);
      });
    }

    return this.props.linkFacebook().then(() => {
      this.setState({
        linkingFacebook: false,
      });
    }).catch((error) => {
      Alert.alert('Error', error.message, [
          { text: 'OK', onPress: () => this.setState({ linkingFacebook: false }) },
      ]);
    });
  }

  sexSelected() {
    let selectedValue;
    if (this.state.sex === 'M') {
      selectedValue = 'ชาย';
    } else if (this.state.sex === 'F') {
      selectedValue = 'หญิง';
    } else {
      selectedValue = 'ไม่ระบุ';
    }
    return selectedValue;
  }

  openProfilePicker() {
    return new Promise((resolve) => {
      ImagePicker.showImagePicker((response) => {
        if (!response.error && !response.didCancel) {
          this.setState({
            changedProfilePicture: response,
          });
        }
        if (response.error) {
          Alert.alert('Error', response.error);
        }
        resolve();
      });
    });
  }

  openProfileCoverPicker() {
    return new Promise((resolve) => {
      ImagePicker.showImagePicker((response) => {
        if (!response.error && !response.didCancel) {
          this.setState({
            changedProfileCover: response,
          });
        }
        if (response.error) {
          Alert.alert('Error', response.error);
        }
        resolve();
      });
    });
  }

  openDatePicker() {
    return this.datePicker.open().then((date) => {
      this.setState({
        birthDayDate: date,
      });
    });
  }

  render() {
    return (<View style={commonStyles.listViewContainer}>
      <ModalSpinner visible={this.state.savingProfile || this.state.linkingFacebook} />
      <DatePickerDialog
        ref={(node) => {
          this.datePicker = node;
        }}
      />
      <NavBar
        title="แก้ไขข้อมูล"
        renderRightMenu={OKButton}
        onBackPress={this.props.onBackPress}
        onRightPress={() => {
          this.setState({
            savingProfile: true,
          });
          return this.props.changePublicProfile(
            this.state.name,
            this.state.birthDayDate,
            this.state.sex,
            this.state.changedProfilePicture,
            this.state.changedProfileCover)
            .then(() => {
              this.setState({
                savingProfile: false,
              });
              if (this.props.onBackPress) {
                this.props.onBackPress();
              }
            }).catch((error) => {
              Alert.alert('Error', error.message, [
                { text: 'OK', onPress: () => this.setState({ savingProfile: false }) },
              ]);
            });
        }}
      />
      <ProfileHeader
        user={this.props.user}
        customCoverSource={this.state.changedProfileCover ? { uri: `data:image/jpeg;base64,${this.state.changedProfileCover.data}`, isStatic: true } : null}
        customSource={this.state.changedProfilePicture ? { uri: `data:image/jpeg;base64,${this.state.changedProfilePicture.data}`, isStatic: true } : null}
      >
        <View style={styles.rowDirection}>
          <TouchableOpacity name="profileImageInput" style={styles.whiteBorder} onPress={() => this.openProfilePicker()}>
            <Text style={styles.whiteText}>เปลี่ยนรูปโปรไฟล์</Text>
          </TouchableOpacity>
          <TouchableOpacity name="coverImageInput" style={styles.whiteBorder} onPress={() => this.openProfileCoverPicker()}>
            <Text style={styles.whiteText}>เปลี่ยนรูปพื้นหลัง</Text>
          </TouchableOpacity>
        </View>
      </ProfileHeader>

      <View style={{ flex: 2 }}>
        <View style={[styles.editorBox, { marginVertical: 15 }]}>
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>ชื่อ</Text>
            </View>
            <View style={[styles.input, styles.bottomBorderGrey]}>
              <TextInput
                onChangeText={name => this.setState({ name })}
                style={[styles.textGrey, { flex: 1 }]}
                autoCapitalize="none"
                value={this.state.name}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>เพศ</Text>
            </View>
            <View style={[styles.input, styles.bottomBorderGrey]}>
              <ModalPicker
                optionContainerStyle={{
                  height: undefined,
                  paddingVertical: 30,
                }}
                data={sexPickerData}
                onChange={(option) => { this.setState({ sex: option.value }); }}
              >
                <Text style={styles.textGrey}>{this.sexSelected()}</Text>
              </ModalPicker>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>เกิด</Text>
            </View>
            <TouchableOpacity name="birthDayInput" style={styles.input} onPress={() => this.openDatePicker()}>
              <Text style={styles.textGrey}>{!this.state.birthDayDate ? 'ไม่ระบุ' : moment(this.state.birthDayDate).format('LL')}</Text>
            </TouchableOpacity>
          </View>
        </View>


        <View style={styles.editorBox2}>
          <TouchableOpacity style={styles.row2} onPress={this.onToggleFacebookLink}>
            <Text style={styles.label2}>เชื่อมต่อ Facebook</Text>
            <View>
              <Switch
                value={this.props.facebookLinked}
                onValueChange={this.onToggleFacebookLink}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row2} onPress={this.props.goToChangeEmail}>
            <Text style={styles.label2}>เปลี่ยน Email</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row2} onPress={this.props.goToChangePassword}>
            <Text style={styles.label2}>เปลี่ยน Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>);
  }
}

export default ProfileEditorScreen;
