import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Share,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import moment from 'moment';
import gql from 'graphql-tag';
import ReadMore from '@exponent/react-native-read-more-text';

import BorderButton, { styles as borderButtonStyles } from '../../common/BorderButton';
import CircleImage from '../../common/CircleImage';
import FixBugPureListView from '../../common/FixBugPureListView';
import { toHumanNumber, mapSource, bindFn } from '../../common/utils';
import { colors, styles as commonStyles } from '../../common/styles';
import BookAndPlayerTabBar from '../../common/BookAndPlayerTabBar';

const previewWidth = 60;
const readLikeWidth = 180;
const rowButtonWidth = 55;

const styles = StyleSheet.create({
  cover: {
    height: 200,
    width: undefined,
    resizeMode: 'cover',
  },
  backButtonContainer: {
    top: 20,
    left: 10,
  },
  detailContainer: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  subDetailContainer: {
    width: undefined,
  },
  titleText: {
    fontSize: 18,
  },
  authorText: {
    fontSize: 12,
    color: colors.textFadedGrey,
  },
  reviewContainer: {},
  reviewText: {
    fontSize: 14,
    color: colors.textGrey,
  },
  startReadButtonContainer: {
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
  episodeContainer: {
    paddingVertical: 10,
  },
  metaEpisodeContainer: {
    paddingVertical: 8,
    paddingLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaEpisodeButton: {
    paddingVertical: 1,
    width: rowButtonWidth,
    alignItems: 'center',
  },
  textEpisodeNo: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textEpisodeUpdateAt: {
    fontSize: 10,
    paddingLeft: 5,
    color: colors.textFadedGrey,
  },
  unlockEpisodeText: {
    fontSize: 10,
  },
});

const MetaEpisode = props => (
  <TouchableOpacity 
            onPress={props.onReadPress ? bindFn(props.onReadPress, props.id) : null} >
    <View style={styles.metaEpisodeContainer}>
      <View style={{ width: previewWidth }}>
        <CircleImage
          source={mapSource(props.thumbnailImage)}
          size={50}
        />
      </View>
      <View style={{ width: readLikeWidth }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.textEpisodeNo}>ตอนที่ </Text>
            <Text style={styles.textEpisodeNo}>{props.no}</Text>
          </View>
          <View style={{}}>
            <Text style={styles.textEpisodeUpdateAt}>{moment(props.createdAt).locale('en').format('MMMM D')}</Text>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require('../../assets/common/icon/read.png')} style={{ width: 20, height: 20, resizeMode: 'contain', borderRadius: 4 }} />
            <Text style={{ paddingLeft: 5, fontSize: 12, color: colors.textFadedGrey }}>
              ดู {toHumanNumber(props.viewCount || 0)} ครั้ง
          </Text>
          </View>
          <View style={{ flex: 4, flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require('../../assets/common/icon/heart.png')} style={{ width: 15, height: 15, resizeMode: 'contain', borderRadius: 4, marginLeft: 20 }} />
            <Text style={{ paddingLeft: 5, fontSize: 12, color: colors.textFadedGrey }}>
              {toHumanNumber(props.likeCount || 0)} Like
          </Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: (Dimensions.get('window').width - (previewWidth + readLikeWidth + rowButtonWidth)) / 10 }}>
        {
          !props.lock ?
            <BorderButton
              containerStyle={styles.metaEpisodeButton}
              type="borderFadedBlack"
              caption="อ่าน"
              onPress={props.onReadPress ? bindFn(props.onReadPress, props.id) : null}
            />
            :
            <BorderButton
              containerStyle={styles.metaEpisodeButton} textStyle={styles.unlockEpisodeText} type="lightGreen" caption="jelly"
              renderBeforeText={() => <LockImg />}
            />
        }
      </View>
    </View>
  </TouchableOpacity>
);

const LockImg = () => (
  <View style={{ flexDirection: 'row', marginRight: 2, alignItems: 'center', justifyContent: 'center' }}>
    <Image style={{ height: 10, width: 8, resizeMode: 'stretch', marginRight: 2 }} source={require('../../assets/book/lock.png')} />
    <Text style={[{ fontSize: 12, fontWeight: 'bold', lineHeight: 12 }, borderButtonStyles.lightGreenText]}>20</Text>
  </View>
);

const ReadMoreRender = handlePress => (
  <TouchableOpacity
    style={{
      alignItems: 'flex-end',
    }}
    onPress={handlePress}
  >
    <Text style={{ color: colors.textFadedGrey, fontSize: 12, padding: 5 }}>Read more</Text>
  </TouchableOpacity>
);

const ShowLessRender = handlePress => (
  <TouchableOpacity
    style={{
      alignItems: 'flex-end',
    }}
    onPress={handlePress}
  >
    <Text style={{ color: colors.textFadedGrey, fontSize: 12, padding: 5 }}>Show less</Text>
  </TouchableOpacity>
);

const SubDetail = ({ title, author, synopsis, episodes, onReadPress }) => (
  <View style={styles.subDetailContainer}>
    <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
      <View style={{ flex: 3 }}>
        <View>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.authorText}>{author.name}</Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 5 }}>
        <BorderButton type="lightGreen" caption="ติดตาม" />
      </View>
    </View>
    <View>
      <View style={styles.reviewContainer}>
        <ReadMore
          numberOfLines={3}
          style={styles.reviewText}
          renderTruncatedFooter={ReadMoreRender}
          renderRevealedFooter={ShowLessRender}
        >
          {synopsis}
        </ReadMore>
      </View>
    </View>
    <View>
      {
        episodes.length > 0 ?
          <View style={styles.startReadButtonContainer}>
            <BorderButton
              type="borderFadedBlack"
              onPress={
                onReadPress ?
                  bindFn(onReadPress, episodes[episodes.length - 1].id)
                  : null
              }
              caption={`เริ่มอ่านตอนที่ ${episodes[episodes.length - 1].no}`}
              textStyle={{
                fontSize: 25,
              }}
              containerStyle={{
                paddingVertical: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          </View> : null
      }
    </View>
  </View>
);

const Separator = (sectionID, rowID) => (
  <View style={{ height: 1, backgroundColor: colors.greyBorder }} key={rowID} />
);

class Book extends React.Component {
  constructor(...args) {
    super(...args);

    this.renderEpisode = this.renderEpisode.bind(this);
    this.onSharePress = this.onSharePress.bind(this);
    this.onCommentPress = this.onCommentPress.bind(this);
  }

  onSharePress() {
    Share.share({
      title: `${this.props.clog.title}`,
      message: 'http://139.59.253.62/mock-deep-link/book.html',
    });
  }

  onCommentPress() {
    if (this.props.clog) {
      this.props.goToComment(this.props.clog.id);
    }
  }

  renderEpisode(data) {
    return (
      <View key={data.id}>
        <MetaEpisode {...data} onReadPress={this.props.goToPlayer} />
      </View>
    );
  }

  render() {
    if (this.props.loading) {
      return null;
    }
    const clog = this.props.clog;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
         <StatusBar
          hidden={true}
        />
        <Image source={mapSource(clog.coverImage)} style={styles.cover}>
          <TouchableOpacity style={[styles.backButtonContainer]} onPress={this.props.onBackPress}>
            <View style={{ height: 30, width: 40, flex: 0, marginTop: 0, justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('../../assets/common/white-back-button.png')}
                resizeMode='contain' 
                style={[commonStyles.navBarIcon]} />
            </View>
          </TouchableOpacity>
        </Image>
        <View
          style={{ flex: 1 }}
        >
          <FixBugPureListView
            style={styles.detailContainer}
            data={clog.episodes}
            renderRow={this.renderEpisode}
            minContentHeight={0}
            renderHeader={() => (<View>
              <SubDetail {...clog} onReadPress={this.props.goToPlayer} />
              <Separator />
            </View>)}
            renderSeparator={Separator}
          />
        </View>
        <BookAndPlayerTabBar
          onSharePress={this.onSharePress}
          onCommentPress={this.onCommentPress}
          likeCount={clog.likeCount}
          commentCount={clog.commentCount}
        />
      </View>
    );
  }
}

Book.fragments = {
  clog: gql`
    fragment Book on Clog {
      id
      title
      coverImage
      synopsis
      likeCount
      ## commentCount
      author {
        name
      }
      episodes(sort: NO_DESC) {
        id
        no
        thumbnailImage
        viewCount
        likeCount
        createdAt
      }
    }
  `,
};

export default Book;
