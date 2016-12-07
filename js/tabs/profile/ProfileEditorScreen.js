import React from 'react';

import {
  Image,
  Text,
  View,
  StyleSheet,
  ListView,
  TouchableOpacity,
  TextInput,
  Switch
} from 'react-native';
import moment from 'moment';

import PureListView from '../../common/PureListView';
import CircleImage from '../../common/CircleImage';
import {toHumanNumber, random, mapSource} from '../../common/utils';

import CircleImageWithCategory from './CircleImageWithCategory';
import NavBar from './NavBar';
import {styles as commonStyles, colors as commonColors} from './common';

import ProfileHeader from './ProfileHeader';

class ProfileEditorScreen extends React.Component {
  render() {
    return (<View style={commonStyles.listViewContainer}>
      <NavBar
        title="แก้ไขข้อมูล"
        onLeftPress={() => this.props.onBackPress && this.props.onBackPress()}
        renderRightMenu={() => {
          return (<TouchableOpacity>
              <Image
                source={require('./img/icons/ok.png')}
                style={{
                  height: 25,
                  width: 25,
                  resizeMode: 'contain'
                }}
              />
            </TouchableOpacity>)
        }}
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
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>เพศ</Text>
            </View>
            <TouchableOpacity style={[styles.input, styles.bottomBorderGrey]}>
              <Text style={styles.textGrey}>ชาย</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>เกิด</Text>
            </View>
            <TouchableOpacity style={styles.input}>
              <Text style={styles.textGrey}>15 เมษายน 2519</Text>
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
          <TouchableOpacity style={styles.row2}>
            <Text style={styles.label2}>เปลี่ยน Email</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row2}>
            <Text style={styles.label2}>เปลี่ยน Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>);
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

export default ProfileEditorScreen;
