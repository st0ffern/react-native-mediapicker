# react-native-mediapicker [![version](https://img.shields.io/npm/v/react-native-mediapicker.svg?maxAge=1000&style=flat-square)](https://www.npmjs.org/package/react-native-mediapicker) [![npm](https://img.shields.io/npm/dt/express.svg?maxAge=1000&style=flat-square)](https://www.npmjs.org/package/react-native-mediapicker) [![dependencies](https://david-dm.org/stoffern/react-native-mediapicker.svg?maxAge=1000&style=flat-square)](https://david-dm.org/stoffern/react-native-mediapicker) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?maxAge=2592000&style=flat-square)](http://commitizen.github.io/cz-cli/) [![npm](https://img.shields.io/npm/l/react-native-mediapicker.svg?maxAge=2592000&style=flat-square)]()

[![Greenkeeper badge](https://badges.greenkeeper.io/stoffern/react-native-mediapicker.svg)](https://greenkeeper.io/)


Media Picker for React Native


<img src="https://raw.githubusercontent.com/stoffern/react-native-mediapicker/master/demo/demo.gif" width="350">

## Props

- `callback`: ***required*** Callback function when images was selected.
- `groupTypes`: The group where the photos will be fetched, one of 'Album', 'All', 'Event', 'Faces', 'Library', 'PhotoStream' and 'SavedPhotos'. (Default: SavedPhotos)
- `assetType`: The asset type, one of 'Photos', 'Videos' or 'All'. (Default: Photos)
- `maximum`: Maximum number of selected images. (Default: 15)
- `imagesPerRow`: Number of images per row. (Default: 3)
- `imageMargin`: Margin size of one image. (Default: 5)
- `selectedMarker`: Custom selected image marker component. (Default: checkmark).
- `backgroundColor`: Set background color. (Default: white).
- `selected`: set preselected items (Default: none ).
- `showLoading`: show loading spinners before image will show? (Default: true ).


## Installation

```bash
npm i -S react-native-mediapicker
```
or
```bash
yarn add react-native-mediapicker
```

### Link Native Modules (IOS)

In XCode, you need to add a link to RCTCameraRoll. You will find more information in the [react-native docs](https://facebook.github.io/react-native/docs/linking-libraries-ios.html#content)

### Add Purpose String (IOS)

For IOS10 you need to add a “Privacy - Photo Library Usage Description”-key to Info.plist. For more information, see this [blog](https://useyourloaf.com/blog/privacy-settings-in-ios-10/)

## Usage Examples

```js
import MediaPicker from "react-native-mediapicker"
```

```javascript
<MediaPicker
  callback={items => this.whenClicked(items)}
  groupTypes="SavedPhotos"
  assetType="Photos"
  maximum={1}
  imagesPerRow={3}
  imageMargin={5}
  showLoading={true}
  backgroundColor="black"
  selectedMarker={
    <Image
      style={[styles.checkIcon, {width: 25, height: 25, right: this.props.imageMargin + 5},]}
      source={require('./checkmark.png')}
    />
  } />
```
