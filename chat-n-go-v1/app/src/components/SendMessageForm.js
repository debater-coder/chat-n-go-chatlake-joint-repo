import React from "react"
import "emoji-mart/css/emoji-mart.css"
import { Picker } from "emoji-mart"

class SendMessageForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: "",
      emojiActive: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      message: e.target.value,
    })
  }

  handleSubmit() {
    this.props.sendMesssage(this.state.message)
    this.setState({
      message: "",
      emojiActive: false
    })
  }

  // eslint-disable-next-line
  insertEmoji = (
    emoji
  ) => this.setState({ message: this.state.message + emoji["native"] })

  render() {
    return (
      <div
        className={"send-message-form"}
      >
        <Picker
          showPreview={false}
          showSkinTones={false}
          onSelect={this.insertEmoji.bind(this)}
          native={true}
          style={{
            float: "right",
            display: this.state.emojiActive ? "inline-block" : "none",
          }}
        />
        <input
          onChange={this.handleChange}
          value={this.state.message}
          placeholder="Type your message"
          type="text"
          aria-label={"Type your message here and press enter or the send button"}
          onKeyUp={e => {
            e.preventDefault()
            if (e.key === "Enter") {
              this.handleSubmit()
            }
          }}
        />
        <button
          className="material-icons"
          onClick={() =>
            this.setState({ emojiActive: !this.state.emojiActive })
          }
        >
          insert_emoticon
        </button>
        <button
          className="material-icons"
          onClick={this.handleSubmit}
        >
          send
        </button>
      </div>
    )
  }
}

export default SendMessageForm
