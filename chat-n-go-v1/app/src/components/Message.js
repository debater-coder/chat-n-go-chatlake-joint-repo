import React from 'react'
import Avatar from './Avatar'

class Message extends React.Component {
  render () {
    if (this.props.user !== this.props.sender.name) {
      return (
        <div>
          <Avatar
            name={this.props.sender.name}
          />
          <span
            className='message message-left'
          >
            {this.props.content}{' '}
            <span className='time'>
              {this.props.time}
            </span>
          </span>
          <div
            className='sender'
          >
            <b>{this.props.sender.name}</b>
          </div>
        </div>
      )
    } else {
      return (
        <span
          className='message message-right'
        >
          {this.props.content}{' '}
          <span className='time'>
            {this.props.time}
          </span>
        </span>
      )
    }
  }
}

export default Message
