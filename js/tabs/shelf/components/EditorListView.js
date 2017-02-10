import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import gql from 'graphql-tag';

import CircleImageWithCategory from '../../../common/CircleImageWithCategory';
import CircleImage from '../../../common/CircleImage';
import FixBugPureListView from '../../../common/FixBugPureListView';
import HorizontalListView from '../../../common/HorizontalListView';
import { colors } from '../../../common/styles';
import { mapSource, toHumanNumber, bindFn } from '../../../common/utils';
import { FollowButton, UnfollowButton } from '../../../common/BasicButton';
import { getCategoryFullName } from '../../../models/clog';

import NavBar from '../components/NavBar';

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: 'rgb(0, 150, 253)',
  },
  titleText: {
    fontSize: 18,
    color: 'white',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  clogCountText: {
    fontSize: 12,
    color: colors.textFadedGrey,
    fontWeight: 'bold',
  },
  followingCountText: {
    fontSize: 12,
    color: colors.textFadedGrey,
    fontWeight: 'bold',
  },
  metaClogContainer: {
    marginTop: 15,
  },
});

class ClogMeta extends React.Component {
  render() {
    const clog = this.props.clog || {};
    return (
      <TouchableOpacity
        onPress={bindFn(this.props.onPress, clog.id)}
        style={{ flex: 1, paddingHorizontal: 5, width: 55 }}
      >
        <View style={{ height: 45 }}>
          <CircleImageWithCategory
            source={mapSource(clog.preview)}
            category={clog.category}
            size={45}
            shadowRadius={5}
            shadowColor={colors.fadedWhite}
          />
        </View>
        <View style={{ alignItems: 'center', paddingTop: 5 }}>
          <Text
            style={{ fontSize: 12, color: 'black' }}
            numberOfLines={1}
          >
            {clog.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const MetaEditorRow = props => (
  <View style={styles.rowContainer}>
    <TouchableOpacity onPress={bindFn(props.onEditorPress, props.editor.id)}>
      <CircleImage
        source={mapSource(props.editor.profilePicture)}
        size={100}
        shadowRadius={5}
        shadowColor="rgba(255, 255, 255, 1)"
      />
    </TouchableOpacity>
    <View style={{ flex: 1, paddingLeft: 20, height: 130 }}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.nameText} numberOfLines={1}>{props.editor.name}</Text>
          <Text style={styles.clogCountText} numberOfLines={1}>
            {toHumanNumber(props.editor.clogCount)} Clogs
          </Text>
          <Text style={styles.followingCountText} numberOfLines={1}>
            {toHumanNumber(props.editor.followingCount)} คน กำลังติดตาม
          </Text>
        </View>
        <View style={{ width: 80, alignItems: 'flex-end' }}>
          {
              props.editor.isFollowing ?
                <UnfollowButton />
              : <FollowButton />
            }
        </View>
      </View>
      <View style={{ height: 80 }}>
        <HorizontalListView
          data={props.editor.clogs}
          style={styles.metaClogContainer}
          renderRow={clog => <ClogMeta onPress={props.onClogPress} clog={clog} />}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  </View>
);

class EditorListView extends React.Component {
  constructor(...args) {
    super(...args);

    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(editor) {
    return (
      <MetaEditorRow
        onEditorPress={this.props.onEditorPress}
        onClogPress={this.props.onClogPress}
        editor={editor}
      />
    );
  }

  render() {
    return (<View
      style={{
        flex: 1,
        backgroundColor: colors.greyBackground,
      }}
    >
      <NavBar
        onBackPress={this.props.onBackPress}
        title={`Editor ${getCategoryFullName(this.props.category)}`}
        containerStyle={styles.navBar}
        titleTextStyle={styles.titleText}
        renderRightMenu={() => (
          <TouchableOpacity><Image style={{ height: 20, resizeMode: 'contain' }} source={require('../img/white-search.png')} /></TouchableOpacity>
        )}
      />
      <FixBugPureListView
        minContentHeight={0}
        data={this.props.editors}
        renderRow={this.renderRow}
      />
    </View>
    );
  }
}

EditorListView.fragments = {
  editor: gql`
    fragment EditorListView on Editor {
      id
      profilePicture
      name
      followingCount
      clogCount
      isFollowing
      clogs {
        id
        title
        preview
        category
      }
    }
  `,
};

export default EditorListView;
