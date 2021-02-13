import React from 'react'
import Message from './Message'

class MessageList extends React.Component {
  getSnapshotBeforeUpdate (prevProps, prevState) {
    return (
      window.innerHeight + window.pageYOffset + 100 >=
      document.body.scrollHeight
    )
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (snapshot) {
      window.scrollTo(0, document.body.scrollHeight)
    }
  }

  getTime (time) {
    const dt = new Date(time)
    let hours = dt.getHours() // gives the value in 24 hours format
    const AmOrPm = hours >= 12 ? 'pm' : 'am'
    hours = hours % 12 || 12
    let minutes = String(dt.getMinutes())
    minutes = minutes.length === 2 ? minutes : '0' + minutes
    return hours + ':' + minutes + ' ' + AmOrPm
  }

  getFunnyLoadingMessage() {
    let funnyMessages = [
      "Consulting about the app with internet monkeys...",
      "Oh, I'm supposed to actually load the page",
      "Adding Randomly Mispeled Words Into Text",
      "Everything is completely fine, don't panic!",
      "Proving that 1+1=3...",
      "Blowing up creepers...",
      "Task failed successfully",
      "Trying to stop data from exploding",
      "Contacting minions for support..."
    ]
    return funnyMessages[Math.floor(Math.random() * 9)]
  }

  render () {
    return (
      <div>
        <div
          key={-1}
          className='message-spacing-container'
        />
        <div style={{position: "fixed", top: "40%", left: "40%", visibility: this.props.spinner ? "visible" : "hidden", textAlign: "center"}}>
          <div className="sk-fold" style={{margin: "auto"}}>
            <div className="sk-fold-cube"/>
            <div className="sk-fold-cube"/>
            <div className="sk-fold-cube"/>
            <div className="sk-fold-cube"/>
          </div>
          <p id={"loading-message-1"}>Please wait while we load your app</p>
          <p id={"loading-message-2"}>{this.getFunnyLoadingMessage()}</p>
        </div>
        {this.props.messages.map((message, index) => {
          return (
            <div
              key={index}
              className='message-container'
            >
              <Message
                content={message.content}
                time={this.getTime(message.time)}
                sender={message.sender}
                key={index}
                user={
                  this.props.user.name
                }
              />
            </div>
          )
        })}
        <div
          key={-2}
          className='message-spacing-container'
        />
      </div>
    )
  }
}

export default MessageList
