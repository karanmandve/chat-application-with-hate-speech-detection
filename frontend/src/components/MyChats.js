import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Button } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import { Avatar,Flex } from "@chakra-ui/react";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats ,notification,setNotification} = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  let count=(rid)=>{
    let count=0;
    notification.map((notif)=>{
    console.log(notif);
      // let id=notif.chat.users[0]?._id === notif.sender._id ?._id ? notif.chat.users[0]._id : notif.chat.users[1]._id;
      let id = notif.chat.users[0]._id === notif.sender._id ? notif.chat.users[0]._id : notif.chat.users[1]._id;
      
      if(id === rid){
        count++;
      }
    });
    return count;
  };
  
  let isSelected=(rid)=>{
    console.log(selectedChat);
    console.log(rid);
    if(selectedChat !== undefined && selectedChat.users !==undefined ){
        let id = selectedChat.users[0]._id === rid ? selectedChat.users[0]._id : selectedChat.users[1]._id;
      if(id === rid){
        return true;
      }
      else{
        return false;
      }
    }
    return false;
  }
console.log(chats);
  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() =>{ setSelectedChat(chat);console.log(chat);setNotification(notification.filter((n)=>{
                  let rec=chat.users[0]?._id === loggedUser?._id ? chat.users[1]._id : chat.users[0]._id;
                  let receiver = n.chat.users[0]._id === rec ? n.chat.users[0]._id :n.chat.users[1]._id;
                  if(rec !== receiver){
                      return true;
                  }
                  else{
                      return false;
                  }
                  
                }))}}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Flex wrap="wrap">                 
                  <Avatar
                  borderRadius='full'
                  boxSize="50px"
                 
                  src={chat.users[0]?._id === loggedUser?._id ? chat.users[1].pic : chat.users[0].pic}
                  name={chat.users[0]?._id === loggedUser?._id ? chat.users[1].name : chat.users[0].name}
                  />
                  <Box pl={2}>
                    <Text>
                        {!chat.isGroupChat
                          ? getSender(loggedUser, chat.users)
                          : chat.chatName}
                      </Text>
                      {chat.latestMessage && (
                        <Text fontSize="xs">
                          <b>{chat.latestMessage.sender.name} : </b>
                          {chat.latestMessage.content.length > 50
                            ? chat.latestMessage.content.substring(0, 51) + "..."
                            : chat.latestMessage.content}
                        </Text>
                      )}
                  </Box>
                  { !isSelected(chat.users[0]?._id === loggedUser?._id ? chat.users[1]._id : chat.users[0]._id) ? <NotificationBadge
                    count={count(chat.users[0]?._id === loggedUser?._id ? chat.users[1]._id : chat.users[0]._id)}
                    effect={Effect.SCALE}
                    style={{backgroundColor:"#04ed04",top : "-3rem",right: "0px"}}
                  />:"" }
                  
                </Flex> 
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;

// chat.users[0]?._id === loggedUser?._id ? chat.users[1]._id : chat.users[0]._id