const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

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


const k = 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;

// const {OpenAI} = require("openai");

// // const config = new Configuration({
// //     apiKey: "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"
// // })


// const openai = new OpenAI({
//     apiKey: "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"
// });

// const message = "you fuck everything"

// async function main() {
//     const completion = await openai.chat.completions.create({
//       messages: [{ role: "system", content: `${message} contain bad word or not` }],
//       model: "gpt-3.5-turbo",
//     });
  
//     console.log(completion.choices[0]);
//   }
  
// main();


  

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

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
});

module.exports = { allMessages, sendMessage };
