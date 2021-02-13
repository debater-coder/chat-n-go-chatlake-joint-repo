import React from 'react'

// noinspection SpellCheckingInspection
const palette = [
  'ff5252',
  '536dfe',
  'ff4081',
  'e040fb',
  'ff6e40',
  '448aff',
  '18ffff',
  'ffd740',
  '64ffda',
  '40c4ff',
  '69f0ae',
  '7c4dff',
  'eeff41',
  'b2ff59',
  'ffff00',
  'ffab40'
]

class Avatar extends React.Component {
  ColorLuminance (hex, lum) {
    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '')
    if (hex.length < 6) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
    }
    lum = lum || 0

    // convert to decimal and change luminosity
    let rgb = ''
    let c
    let i
    for (i = 0; i < 3; i++) {
      c = parseInt(hex.substr(i * 2, 2), 16)
      c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16)
      rgb += ('00' + c).substr(c.length)
    }

    return rgb
  }

  name2Color (name) {
    let sum = 0
    let x
    for (x of name) {
      sum += x.charCodeAt(0)
    }
    return sum
  }

  render () {
    return (
      <img
        src={
          'https://ui-avatars.com/api/?rounded=true&bold=true&size=64&name=' +
          this.props.name +
          '&background=' +
          this.ColorLuminance(palette[this.name2Color(this.props.name) % 16], 1) +
          '&color=' +
          this.ColorLuminance(palette[this.name2Color(this.props.name) % 16], -0.25)
        }
        alt={this.props.name}
        className='avatar'
      />
    )
  }
}

export default Avatar
