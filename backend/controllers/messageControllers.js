const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const {detectHateSpeech} = require("../ai/hsd");

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;
  const flag=false;
  console.log(content);
      await detectHateSpeech(content)
      .then(result => {
        console.log(result);
          if (result === true){
            console.log("here i am");
            flag=true;
          }
      })

  

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  
  if(flag){
    return res.sendStatus(400);
  }
  else{
    var newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
    };
    try {
      var message = await Message.create(newMessage);
  
      message = await message.populate("sender", "name pic").execPopulate();
      message = await message.populate("chat").execPopulate();
      message = await User.populate(message, {
        path: "chat.users",
        select: "name pic email",
      });
  
      await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
  
      res.json(message);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
  
});

module.exports = { allMessages, sendMessage };
