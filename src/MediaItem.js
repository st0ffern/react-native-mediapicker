import React, { Component } from 'react'
import{
  View
  ,StyleSheet
  ,Dimensions
  ,ActivityIndicator
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
  componentWillMount(){
    var { width } = Dimensions.get('window');
    this.imageSize = ((width - (this.props.imagesPerRow+1) * this.props.imageMargin) / this.props.imagesPerRow);

    if (this.props.selected.indexOf(this.props.item)){
      console.log(this.props.selected);

      this.setState({selected: true})
    }
  }

  render(){
    var {item} = this.props
    var marker = this.props.selectedMarker ? this.props.selectedMarker :
      <Image
        style={[styles.checkIcon, {width: 25, height: 25, right: this.props.imageMargin + 5},]}
        source={require('./checkmark.png')}
      />
    return (
      <Button
        key={item.node.image.uri}
        style={{marginBottom: this.props.imageMargin, marginRight: this.props.imageMargin}}
        onPress={event => this._handleClick(item.node.image)}>
        <Image 
          indicator={ActivityIndicator}
          source={{ uri: item.node.image.uri }} 
          style={{height: this.imageSize, width: this.imageSize}} >
          { (!this.state.selected)? marker : null }
        </Image>
      </Button>
    )    
  }

  _handleClick(item){
    this.setState({
      selected: !this.state.selected
    })
    this.props.onClick(item)
  }

}

var styles = StyleSheet.create({
  checkIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'transparent',
  },
})

MediaItem.defaultProps = {
  item: {},
  selected: [],
}

MediaItem.propTypes = {
  item: React.PropTypes.any.isRequired,
  onClick: React.PropTypes.func.isRequired,
  selected: React.PropTypes.array,
  selectedMarker: React.PropTypes.element,
  imageMargin: React.PropTypes.number.isRequired,
}


export default MediaItem