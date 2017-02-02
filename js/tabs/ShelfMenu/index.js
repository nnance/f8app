import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';

import {STATUS_BAR_HEIGHT, colors} from '../../common/styles';
import CircleImage from '../../common/CircleImage';
import {getCategoryIcon, getCategoryLogo} from '../../models/clog';

const CloseMenuButton = ({onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <Image source={require('./img/close.png')} style={{width: 15, height: 15, resizeMode: 'contain'}}/>
  </TouchableOpacity>
);

const ShowTagButton = ({onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <Image source={require('./img/show-tag.png')} style={{width: 20, height: 20, resizeMode: 'contain'}}/>
  </TouchableOpacity>
);

const HideTagButton = ({onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <Image source={require('./img/hide-tag.png')} style={{width: 20, height: 20, resizeMode: 'contain'}}/>
  </TouchableOpacity>
);

const Topic = ({title, children, style}) => (
  <View style={style}>
    <View style={{backgroundColor: colors.fadedGreyBackground, paddingVertical: 4, paddingLeft: 10}}>
      <Text style={{color: 'rgba(255, 255, 255, 0.2)', fontSize: 12}}>{title}</Text>
    </View>
    <View style={{paddingVertical: 0, paddingLeft: 10}}>
      {children}
    </View>
  </View>
);

const FadedMenuItem = ({title, source}) => (
  <View style={{flexDirection: 'row', paddingVertical: 6, paddingHorizontal: 5, alignItems: 'center'}}>
    <Image source={source} style={{width: 20, height: 20, resizeMode: 'contain'}}/>
    <View style={{marginLeft: 10}}>
      <Text style={[{fontSize: 13}, styles.fadedWhiteText]}>{title}</Text>
    </View>
  </View>
);

const WhiteMenuItem = ({title, source, renderedButton, style}) => (
  <View style={[{flexDirection: 'row', paddingVertical: 10, paddingLeft: 5, alignItems: 'center'}, style]}>
    <CircleImage source={source} size={25}/>
    <View style={{marginLeft: 10}}>
      <Text style={{color: 'white', fontWeight: 'bold'}}>{title}</Text>
    </View>
    <View style={{flex: 1, paddingRight: 10, alignItems: 'flex-end', justifyContent: 'center'}}>
      {renderedButton}
    </View>
  </View>
);

class ClogMenuItem extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      showTag: false
    };
  }

  render() {
    return (
      <View>
        <WhiteMenuItem
          style={{paddingTop: 10, paddingBottom: this.state.showTag ? 5 : 10}}
          title={this.props.title}
          source={this.props.source}
          renderedButton={!this.state.showTag ? <ShowTagButton onPress={this.onShowTagPress.bind(this)}/> : <HideTagButton onPress={this.onHideTagPress.bind(this)}/>}
          />
        {
          this.state.showTag ?
            <View style={{paddingLeft: 40, marginBottom: 10}}>{this.renderTagItem()}</View>
            : null
        }
        {
          !this.props.notShowBottomLine ?
            <View style={{flex: 1, marginVertical: 0, marginLeft: 40, height: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)'}}></View>
            : null
        }
      </View>
    );
  }

  onShowTagPress() {
    this.setState({
      showTag: true
    });
  }

  onHideTagPress() {
    this.setState({
      showTag: false
    });
  }

  renderTagItem() {
    const tags = [{title: 'Chat Clog'}, {title: 'Vide Clog'}];
    return (
      <View>
        {
          tags.map(tag => (
            <Text style={[styles.fadedWhiteText, {paddingVertical: 1}]}>{tag.title}</Text>
          ))
        }
      </View>
    )
  }
}

class ShelfMenu extends React.Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'rgba(50, 31, 85, 1)'}}>
        <View style={{height: STATUS_BAR_HEIGHT}}/>
        <View style={styles.closeContainer}>
          <CloseMenuButton onPress={this.props.onClose}/>
        </View>
        <ScrollView>
          <Topic title="หมวดหมู่เรื่องราว">
            <ClogMenuItem title="Gag Clog" source={getCategoryLogo('G')}/>
            <ClogMenuItem title="Diary Clog" source={getCategoryLogo('D')}/>
            <ClogMenuItem title="Novel Clog" source={getCategoryLogo('N')}/>
            <ClogMenuItem title="Myth Clog" notShowBottomLine={true} source={getCategoryLogo('M')}/>
          </Topic>
          <Topic title="ข้อมูล">
            <WhiteMenuItem title="David Beckham" source={getCategoryIcon('D')}/>
          </Topic>
          <Topic title="เกี่ยวกับ">
            <FadedMenuItem title="เกี่ยวกับ Clogii" source={require('./img/about.png')}/>
            <FadedMenuItem title="ข้อกำหนดในการใช้ Clogii" source={require('./img/policy.png')}/>
          </Topic>
          <Topic title="ติดตาม">
            <FadedMenuItem title="Facebook" source={require('./img/fb.png')}/>
            <FadedMenuItem title="Line" source={require('./img/line.png')}/>
            <FadedMenuItem title="Instagram" source={require('./img/ig.png')}/>
          </Topic>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  closeContainer: {
    paddingLeft: 15,
    paddingVertical: 10
  },
  fadedWhiteText: {
    color: 'rgba(255, 255, 255, 0.2)'
  }
});

export default ShelfMenu;
