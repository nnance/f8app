import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

import WhiteMenuItem from './WhiteMenuItem';
import styles from './styles';

// cant be stateless component
/* eslint react/no-multi-comp: warn */

export class ShowTagButton extends React.Component {
  render() {
    const { onPress } = this.props;
    return (<TouchableOpacity onPress={onPress}>
      <Image source={require('../../../assets/shelf-menu/show-tag.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
    </TouchableOpacity>);
  }
}

export class HideTagButton extends React.Component {
  render() {
    const { onPress } = this.props;
    return (<TouchableOpacity onPress={onPress}>
      <Image source={require('../../../assets/shelf-menu/hide-tag.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
    </TouchableOpacity>);
  }
}

class ClogMenuItem extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      showTag: false,
    };

    this.onShowTagPress = this.onShowTagPress.bind(this);
    this.onHideTagPress = this.onHideTagPress.bind(this);
  }

  onShowTagPress() {
    this.setState({
      showTag: true,
    });
  }

  onHideTagPress() {
    this.setState({
      showTag: false,
    });
  }

  onTagPress(id) {
    if (this.props.onTagPress) {
      this.props.onTagPress(id);
    }
  }

  renderTagItem() {
    const tags = this.props.tags;
    return (
      <View>
        {
          tags.map(tag => (
            <TouchableOpacity key={tag.id} onPress={() => this.onTagPress(tag.id)}>
              <Text style={[styles.fadedWhiteText, { paddingVertical: 5 }]}>{tag.title}</Text>
            </TouchableOpacity>
          ))
        }
      </View>
    );
  }

  render() {
    return (
      <View>
        <WhiteMenuItem
          style={{ paddingTop: 10, paddingBottom: this.state.showTag ? 5 : 10 }}
          title={this.props.title}
          onPress={this.props.onClogPress}
          icon={<Image source={this.props.source} style={{ width: 25, height: 25, resizeMode: 'contain' }} />}
          renderedButton={
            !this.state.showTag ?
              <ShowTagButton onPress={this.onShowTagPress} />
            : <HideTagButton onPress={this.onHideTagPress} />
          }
        />
        {
          this.state.showTag ?
            <View style={{ paddingLeft: 40, marginBottom: 10 }}>{this.renderTagItem()}</View>
            : null
        }
        {
          !this.props.notShowBottomLine ?
            <View style={{ flex: 1, marginVertical: 0, marginLeft: 40, height: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)' }} />
            : null
        }
      </View>
    );
  }
}

export default ClogMenuItem;
