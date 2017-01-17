# aframe-persist-component
Use localStorage to make data persist over experiences.

Tro try the example http://vatelier.net/MyDemo/aframe-persist-component/ move the camera around then refresh. You can also move the cube around using the inspector.

## Properties

| Property | Description                                                          | Default Value |
| -------- | -------------------------------------------------------------------- | ------------- |
|attribute | specify which attributes of an entity should be saved                | position      |
|debug     | console.log() when attributes are loaded, saved and with what values | true          |

## Installation

### Browser

Install and use by directly including the component:
```html
  <script src="https://rawgit.com/Utopiah/aframe-persist-component/master/aframe-persist-component.js"></script>
```
## Basic usage
```html
  <a-scene>
    <a-camera id="mycamera" persist></a-camera>
  </a-scene>
```
## Example
```html
<head>
  <title>local state save</title>
  <script src="https://aframe.io/releases/0.4.0/aframe.min.js"></script>
  <script src="https://rawgit.com/Utopiah/aframe-persist-component/master/aframe-persist-component.js"></script>
</head>
<body>
  <a-scene>
    <a-camera id="testingid" persist="debug:true;"
      persist__rot="debug:true; attribute:rotation;"></a-camera>
    <a-box id="testingid2"
      persist__pos="debug:true; attribute:position;"
      persist__rot="debug:true; attribute:rotation;"></a-box>
    <!-- commented out to remove shader errors...
    <a-box scale="20 20 20" color="grey" scale="1" material="side:double"></a-box>
-->
    
  </a-scene>
</body>
```

## Limitations
- There is no traversal, each attribute to be saved has to be explicitely defined as such.
- Each entity *requires* to have its unique ID, if not a warning message will de displayed then nothing will be saved.
- Simple attributes like visible work but composed attributes (e.g. color or material) do not work.
