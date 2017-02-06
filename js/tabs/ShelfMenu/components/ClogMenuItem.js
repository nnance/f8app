import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';

import WhiteMenuItem from './WhiteMenuItem';
import CircleImage from '../../../common/CircleImage';
import styles from './styles';

export class ShowTagButton extends React.Component {
  render() {
    const {onPress} = this.props;
    return (<TouchableOpacity onPress={onPress}>
      <Image source={require('../img/show-tag.png')} style={{width: 20, height: 20, resizeMode: 'contain'}}/>
    </TouchableOpacity>);
  }
}

export class HideTagButton extends React.Component {
  render() {
    const {onPress} = this.props;
    return (<TouchableOpacity onPress={onPress}>
      <Image source={require('../img/hide-tag.png')} style={{width: 20, height: 20, resizeMode: 'contain'}}/>
    </TouchableOpacity>);
  }
}

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
          onPress={this.props.onClogPress}
          icon={<Image source={this.props.source} style={{width: 25, height: 25, resizeMode: 'contain'}}/>}
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

  onTagPress(id) {
    this.props.onTagPress && this.props.onTagPress(id);
  }

  renderTagItem() {
    const tags = this.props.tags;
    return (
      <View>
        {
          tags.map(tag => (
            <TouchableOpacity key={tag.id} onPress={this.onTagPress.bind(this, tag.id)}>
              <Text style={[styles.fadedWhiteText, {paddingVertical: 5}]}>{tag.title}</Text>
            </TouchableOpacity>
          ))
        }
      </View>
    )
  }
}

export default ClogMenuItem;
