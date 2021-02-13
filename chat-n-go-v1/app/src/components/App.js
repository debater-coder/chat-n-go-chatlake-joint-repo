import React from "react"
import MessageList from "./MessageList"
import Container from "./container"
import "./index.css"
import Helmet from "react-helmet"
import SendMessageForm from "./SendMessageForm"
import Pusher from "pusher-js"
import { withSnackbar } from 'notistack';
import { Button } from '@material-ui/core';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      showSpinner: true
    }

    this.currentUser = {
      name: "",
    }
  }

  componentDidMount() {
    fetch("https://serene-harbor-69710.herokuapp.com/getMessages")
      .then(response => response.json())
      .then(data => {
          this.setState({showSpinner: false})
          this.currentUser.name = prompt("What is your name?")
          this.setState(data)
          window.addEventListener("beforeinstallprompt", e => {
            e.preventDefault()
            const action = key => (
              <>
                <Button style={{color: "#98fb98"}} onClick={() => {
                  e.prompt()
                  this.props.closeSnackbar(key)
                }}>Install</Button>
                <Button style={{color: "#c8c8c8"}} onClick={() => {this.props.closeSnackbar(key)}}>Dismiss</Button>
              </ >
            )
            this.props.enqueueSnackbar("This website can be installed as an app.", {
              autoHideDuration: 7000,
              action
            })
          })
        }
      )

    let pusher = new Pusher("9e576f7c73eac65c8bbf", {
      cluster: "ap4",
    })
    let channel = pusher.subscribe("chatroom_xyz")
    channel.bind("message", message =>
      this.setState({ messages: [...this.state.messages, message] })
    )
  }

  // eslint-disable-next-line
  sendMessage = text => {
    if (text) {
      fetch(
        "https://serene-harbor-69710.herokuapp.com/sendMessage",
        {
          method: "post",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            content: text,
            time: Date.now(),
            sender: this.currentUser,
          }),
        }
      ).then(response => {
        if (response.status !== 200) {
          console.error(`Error! ${response.status}`)
        }
      })
    }
  }

  render() {
    return (
      <Container>
        <Helmet htmlAttributes={{ lang: 'en' }}>
          <title>Chat'n'go</title>
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons&display=swap"
            rel="stylesheet"
          />
        </Helmet>
        <MessageList messages={this.state.messages} spinner={this.state.showSpinner} user={this.currentUser}/>
        <SendMessageForm sendMesssage={this.sendMessage.bind(this)} />
      </Container>
    )
  }
}

export default withSnackbar(App)
