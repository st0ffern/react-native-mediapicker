# react-native-media-picker
Media Pickerfor React Native

<img src="https://raw.githubusercontent.com/stoffern/react-native-media-picker/master/demo/demo.gif" width="350">

## Props

- `callback`: ***required*** Callback function when images was selected.
- `groupTypes`: The group where the photos will be fetched, one of 'Album', 'All', 'Event', 'Faces', 'Library', 'PhotoStream' and 'SavedPhotos'. (Default: SavedPhotos)
- `assetType`: The asset type, one of 'Photos', 'Videos' or 'All'. (Default: Photos)
- `maximum`: Maximum number of selected images. (Default: 15)
- `imagesPerRow`: Number of images per row. (Default: 3)
- `imageMargin`: Margin size of one image. (Default: 5)
- `selectedMarker`: Custom selected image marker component. (Default: checkmark).
- `backgroundColor`: Set background color. (Default: white).


## Installation

```js
npm i -S react-native-media-picker
```

## Usage Examples

```js
import MediaPicker from "react-native-media-picker"
```

```javascript
<MediaPicker
  callback={items => this.whenClicked(items)}
  groupTypes="SavedPhotos"
  assetType="Photos"
  maximum={1}
  imagesPerRow={3}
  imageMargin={5}
  selectedMarker
  backgroundColor />
```
