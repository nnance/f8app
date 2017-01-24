import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import moment from 'moment';

import NavBar from '../../../common/NavBar';
import BorderButton, {styles as borderButtonStyles} from '../../../common/BorderButton';
import PureListView from '../../../common/PureListView';
import CircleImage from '../../../common/CircleImage';
import {toHumanNumber, mapSource} from '../../../common/utils';
import {colors, styles as commonStyles} from '../../../common/styles';

const MetaEpisode = (props) => (
  <View style={styles.metaEpisodeContainer}>
    <View style={{width: 60}}>
      <CircleImage
        source={mapSource(props.preview)}
        size={50}
        />
    </View>
    <View style={{width: 200}}>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textEpisodeNo}>ตอนที่ </Text>
          <Text style={styles.textEpisodeNo}>{props.no}</Text>
        </View>
        <View style={{}}>
          <Text style={styles.textEpisodeUpdateAt}>{moment(props.createdAt).locale('en').format('MMMM D')}</Text>
        </View>
      </View>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 3, flexDirection: 'row', alignItems: 'center'}}>
          <Image source={require('../../../common/img/icon/read.png')} style={{width: 20, height: 20, resizeMode: 'contain', borderRadius: 4}}/>
          <Text style={{paddingLeft: 5, fontSize: 12, color: colors.textFadedGrey}}>ดู {toHumanNumber(props.viewCount || 0)} ครั้ง</Text>
        </View>
        <View style={{flex: 4, flexDirection: 'row', alignItems: 'center'}}>
          <Image source={require('../../../common/img/icon/heart.png')} style={{width: 15, height: 15, resizeMode: 'contain', borderRadius: 4, marginLeft: 20}}/>
          <Text style={{paddingLeft: 5, fontSize: 12, color: colors.textFadedGrey}}>{toHumanNumber(props.likeCount || 0)} Like</Text>
        </View>
      </View>
    </View>
    <View style={{flex: 1, alignItems: 'flex-end', paddingLeft: 10}}>
      {
        !props.lock ?
        <BorderButton containerStyle={styles.metaEpisodeButton} type="borderFadedBlack" caption="อ่าน"/>
        :
        <BorderButton containerStyle={styles.metaEpisodeButton} textStyle={styles.unlockEpisodeText} type="lightGreen" caption="jelly"
          renderBeforeText={() => <LockImg/>}/>
      }
    </View>
  </View>
);

const LockImg = () => (
  <View style={{flexDirection: 'row', marginRight: 2, alignItems: 'center', justifyContent: 'center'}}>
    <Image style={{height: 10, width: 8, resizeMode: 'stretch', marginRight: 2}} source={require('../../img/icons/lock.png')}/>
    <Text style={[{fontSize: 12, fontWeight: 'bold', lineHeight: 12}, borderButtonStyles.lightGreenText]}>20</Text>
  </View>
);

const SubDetail = ({title, author, review }) => (
  <View style={styles.subDetailContainer}>
    <View style={{flexDirection: 'row', paddingVertical: 10}}>
      <View style={{flex: 3}}>
        <View>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.authorText}>{author.name}</Text>
        </View>
      </View>
      <View style={{paddingHorizontal: 5}}>
        <BorderButton type="lightGreen" caption="ติดตาม"/>
      </View>
    </View>
    <View>
      <View style={styles.reviewContainer}>
        <Text style={styles.reviewText}>{review}</Text>
      </View>
    </View>
    <View>
      <View style={styles.startReadButtonContainer}>
        <BorderButton
          type="borderFadedBlack"
          caption="เริ่มอ่านตอนที่ 1"
          textStyle={{
            fontSize: 25
          }}
          containerStyle={{
            paddingVertical: 5,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          />
      </View>
    </View>
  </View>
);

class Book extends React.Component {
  render() {
    if (this.props.loading) {
      return null;
    }
    const clog = this.props.clog;
    return (
      <View style={{flex: 1}}>
        <Image source={require('../img/mockCover.png')} style={styles.cover}>
          <TouchableOpacity style={styles.backButtonContainer} onPress={this.onBackPress.bind(this)}>
            <Image source={require('../../../common/img/icon/backButton.png')} style={commonStyles.navBarIcon}/>
          </TouchableOpacity>
        </Image>
        <ScrollView style={styles.detailContainer}>
          <SubDetail {...clog}/>
          <View style={styles.episodeContainer}>
            <View style={{height: 1, backgroundColor: colors.greyBorder}}/>
            {
              clog.episodes.map(this.renderEpisode.bind(this))
            }
          </View>
        </ScrollView>
      </View>
    );
  }

  renderEpisode(data) {
    return (
      <View>
        <MetaEpisode {...data}/>
        <View style={{height: 1, backgroundColor: colors.greyBorder}}/>
      </View>
    );
  }

  onBackPress() {
    this.props.onBackPress && this.props.onBackPress();
  }
}

const styles = StyleSheet.create({
  cover: {
    height: 200,
    width: undefined,
    resizeMode: 'cover'
  },
  backButtonContainer: {
    top: 20,
    left: 10
  },
  detailContainer: {
    flex: 1,
    padding: 15
  },
  subDetailContainer: {
    width: undefined
  },
  titleText: {
    fontSize: 18
  },
  authorText: {
    fontSize: 12,
    color: colors.textFadedGrey
  },
  reviewContainer: {},
  reviewText: {
    fontSize: 14,
    color: colors.textGrey
  },
  startReadButtonContainer: {
    paddingVertical: 15,
    paddingHorizontal: 40
  },
  episodeContainer: {
    paddingVertical: 10
  },
  metaEpisodeContainer: {
    paddingVertical: 8,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  metaEpisodeButton: {
    paddingVertical: 2,
    width: 60,
    alignItems: 'center'
  },
  textEpisodeNo: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  textEpisodeUpdateAt: {
    fontSize: 10,
    paddingLeft: 5,
    color: colors.textFadedGrey
  },
  unlockEpisodeText: {
    fontSize: 10
  }
});

export default Book;
