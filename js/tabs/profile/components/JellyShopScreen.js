import React from 'react';

import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { toHumanNumber } from '../../../common/utils';

import NavBar from './NavBar';
import { styles as commonStyles } from '../common';

const Coin = props => (<TouchableOpacity style={styles.jellyCountBoxContainer}>
  <View style={styles.jellyCountBox}>
    <Image
      source={require('../img/jelly-shop/coin.png')}
      style={styles.coinIcon}
    />
    <View style={{ paddingHorizontal: 5 }}>
      <Text style={styles.coinCountText}>{toHumanNumber(props.coin)}</Text>
    </View>
  </View>
</TouchableOpacity>);

const covers = {
  s1: require('../img/jelly-shop/s1.png'),
  s2: require('../img/jelly-shop/s2.png'),
  s3: require('../img/jelly-shop/s3.png'),
  b1: require('../img/jelly-shop/b1.png'),
  b2: require('../img/jelly-shop/b2.png'),
};

const JellySeller = props => (<Image
  {...props}
  style={[{ flex: 1, marginHorizontal: 3, backgroundColor: 'transparent', resizeMode: 'contain', width: undefined, height: undefined }, props.style]}
  source={covers[props.cover]}
>
  <View style={{ flex: 1, alignItems: 'flex-end', flexDirection: 'row' }}>
    <View style={{ flex: 1, padding: 5, justifyContent: 'center', alignItems: 'center', flexDirection: props.big ? 'row' : 'column' }}>
      <Text style={{ fontWeight: 'bold', padding: 5 }}>{toHumanNumber(props.jelly)} Jelly</Text>
      <Coin coin={props.coin} />
    </View>
  </View>
</Image>);

class JellyShopScreen extends React.Component {
  render() {
    return (<View style={commonStyles.listViewContainer}>
      <NavBar
        title="Jelly Shop"
        onBackPress={this.props.onBackPress}
        renderRightMenu={() => (<Coin coin={12500} />)}
      />
      <ScrollView>
        <View style={{ flexDirection: 'row', padding: 3, flex: 1 }}>
          <JellySeller cover="s1" style={{ height: 150 }} coin={30} jelly={10} />
          <JellySeller cover="s2" style={{ height: 150 }} coin={99} jelly={40} />
          <JellySeller cover="s3" style={{ height: 150 }} coin={150} jelly={60} />
        </View>
        <View style={{ flexDirection: 'row', padding: 3, flex: 1 }}>
          <JellySeller cover="b1" big style={{ height: 140 }} coin={300} jelly={100} />
          <JellySeller cover="b1" big style={{ height: 140 }} coin={500} jelly={300} />
        </View>
        <View style={{ flexDirection: 'row', padding: 3, flex: 1 }}>
          <JellySeller cover="b2" big style={{ height: 140 }} coin={750} jelly={500} />
          <JellySeller cover="b2" big style={{ height: 140 }} coin={1250} jelly={1000} />
        </View>
      </ScrollView>
    </View>);
  }
}

const colors = {
  lightGreen: 'rgb(134, 246, 226)',
};

const styles = StyleSheet.create({
  jellyCountBoxContainer: {
    borderColor: colors.lightGreen,
    borderWidth: 1.5,
    borderRadius: 5,
  },
  jellyCountBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 65,
    paddingVertical: 3,
  },
  coinCountText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.lightGreen,
  },
  coinIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    marginLeft: 5,
  },
});

export default JellyShopScreen;
