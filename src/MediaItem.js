import React, { Component } from 'react'
import{
  View
} from 'react-native'

import Button from 'react-native-nativebutton'
import Image from 'react-native-image-progress'

class MediaItem extends Component{
  constructor(props){
    super(props)
    this.state ={
      selected: false,
    }
  }

  render(){
    return (
    var marker = this.props.selectedMarker ? this.props.selectedMarker :
      <Image
        style={[styles.checkIcon, {width: 25, height: 25, right: this.props.imageMargin + 5},]}
        source={require('./checkmark.png')}
      />
    return (
      <Button
        key={key}
        style={{marginBottom: this.props.imageMargin, marginRight: this.props.imageMargin}}
        onPress={event => this._selectImage(item.node.image)}>
        <Image 
          indicator={ActivityIndicator}
          source={{ uri: item.node.image.uri }} 
          style={{height: this.imageSize, width: this.imageSize}} >
          { (this.state.selected.indexOf(item.node.image) >= 0) ? marker : null }
        </Image>
      </Button>
    )    
  }
}

var styles = React.StyleSheet.create({
  checkIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'transparent',
  },
})
MediaItem.propTypes = {
  data: React.PropTypes.any.isRequired,
  selected: React.PropTypes.array,
  onClick: React.PropTypes.func.isRequired,
}
MediaItem.defaultProps = {
  data: {}
  selected: [],
}

module.exports = MediaItem;