import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import LinkIcon from '@mui/icons-material/Link';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';



function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  //const [formats, setFormats] = React.useState(() => ['bold', 'italic']);

  // const handleFormat = (formats, newFormats) => {
  //     setFormats(newFormats);
  //   };

  const [isBold, setIsBold] = useState(currentMessage);  
  const handleBoldButton = () => {
    setIsBold((prevIsBold) => !prevIsBold);
  };

  const [isItalic, setIsItalic] = useState(currentMessage);  
  const handleItalicButton = () => {
    setIsItalic((prevIsItalic) => !prevIsItalic);
  };

  // const [isUnderlined, setIsUnderlined] = useState(currentMessage);
  // const handleUnderLineButton = () => {
  //   setIsUnderlined((previsUnderlined)=>!previsUnderlined);

  // };


  // const [isLinedList, setIsLinedList] = useState(setCurrentMessage);
  // const handleLinkedButton = () => {
  //   setIsUnderlined((previsLinedList)=>!previsLinedList);

  // };


  // const [isBulleteList, setIsBulleteList] = useState(setCurrentMessage);
  // const handleBulleteListButton = () => {
  //   setIsUnderlined((previsUnderlined)=>!previsUnderlined);

  // };


  // const [isNumberListButton, setIsNumberListButton] = useState(setCurrentMessage);
  // const handleNumberListButton = () => {
  //   setIsUnderlined((previsNumberListButton)=>!previsNumberListButton);

  // };
  // const [isAlignLeftButton, setIsAlignLeftButton] = useState(setCurrentMessage);
  // const handleAlignLeftButton = () => {
  //   setIsUnderlined((previsAlignLeftButton)=>!previsAlignLeftButton);

  // };

  const textStyle = {
    fontWeight: isBold ? "bold" : "normal",
    fontStyle: isItalic ? "italic" : "normal"
  };

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div>
        <div className="chat-footer-box">
                <ButtonGroup
                    size="small"
                    // onChange={handleFormat}
                    color="primary"
                >
                  <Button value="bold" aria-label="bold" onClick={handleBoldButton}>
                    <FormatBoldIcon/>
                  </Button>
                  <Button value="italic" aria-label="italic" onClick={handleItalicButton}>
                    <FormatItalicIcon />
                  </Button>
                  <Button value="underlined" aria-label="underlined" onClick={handleBoldButton}>
                    <FormatUnderlinedIcon />
                  </Button>
                  <Button value="color" onClick={handleBoldButton}>
                    <LinkIcon/>
                  </Button>
                  <Button value="bold" onClick={handleBoldButton}>
                    <FormatListBulletedIcon />
                  </Button>
                  <Button value="color" onClick={handleBoldButton}>
                    <FormatListNumberedIcon/>
                  </Button>
                  <Button value="color" onClick={handleBoldButton}>
                    <FormatAlignLeftIcon/>
                  </Button>
            </ButtonGroup>
        </div>
        <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          style={textStyle}
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
        </div>
        <div className="chat-footer-box">
                <ButtonGroup>
                  <Button value="color" aria-label="bold" >
                    <AttachFileIcon/>
                  </Button>
                  <Button value="color" aria-label="bold" >
                    <AddReactionIcon/>
                  </Button>
                  <Button value="color" aria-label="bold">
                    <AlternateEmailIcon/>
                  </Button>
                </ButtonGroup>
        </div>
      </div>
    </div>
  );
}

export default Chat;
