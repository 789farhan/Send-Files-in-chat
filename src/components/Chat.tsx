"use client";

import React, { useEffect, useState } from "react";
import { CometChat } from "@cometchat/chat-sdk-javascript";
export default function Chat() {
  const CheckUser = async () => {
   const [inputfile, setinputfile] = useState('')
    useEffect(()=>{
      let file=document.getElementById("inputImg")
      // setinputfile(file?.files[0]);
      console.log(file);
    },[])
    let appID: string = "259111d0d926df20",
      region: string = "eu",
      appSetting: CometChat.AppSettings = new CometChat.AppSettingsBuilder()
        .subscribePresenceForAllUsers()
        .setRegion(region)
        .autoEstablishSocketConnection(true)
        .build();
    await CometChat.init(appID, appSetting).then(
      (initialized: boolean) => {
        console.log("Initialization completed successfully", initialized);
        var UID: string = "12",
          authKey: string = "7e831a8f5a61828cd004722973cf6e5fede3852b";
        var authToken: string = "12_1718188636549d3e4c637eebcde116f2b7b970fb";
        CometChat.getLoggedinUser().then(
          (user: CometChat.User | null) => {
            // For User-login
            // one time user logined cannot login
            // again it still consider an active status for current user

            if (!user) {
              // Auth token for existing user Authentication
              // On first time login we get an Auth _Token
              // and after that user can login again and agian
              // with Auth_Token instead of UID & authkey
              //we can also change the Auth_Token of a specific user

              // CometChat.login(authToken).then(
              CometChat.login(UID, authKey).then(
                (user: CometChat.User) => {
                  console.log("Login Successful:", { user });
                },
                (error: CometChat.CometChatException) => {
                  console.log("Login failed with exception:", { error });
                }
              );
            } else {
              // For logout
              // CometChat.logout().then(
              //   (loggedOut: Object) => {
              //     console.log("Logout completed successfully");
              //   },
              //   (error: CometChat.CometChatException) => {
              //     console.log("Logout failed with exception:", { error });
              //   }
              // );

              // send messages
              // for send msg we need 3 Arguments (recieverID,recieverType,message)
              try {
                let receiverID: string = "chat",
                  messageText: string = "hi shabana!",
                  receiverType: string = CometChat.RECEIVER_TYPE.GROUP,
                  textMessage: CometChat.TextMessage =
                    new CometChat.TextMessage(
                      receiverID,
                      messageText,
                      receiverType
                    );

                // Add or send  Metadata

                // let metadata: Object = {
                //   latitude: "50.6192171633316",
                //   longitude: "-72.68182268750002",
                // };
                // textMessage.setMetadata(metadata);

                // Add or send  tags

                // let tags: Array<String> = ["starredMessage"];
                // textMessage.setTags(tags);

                CometChat.sendMessage(textMessage).then(
                  (message: any) => {
                    console.log("Message sent successfully:", message);
                  },
                  (error: CometChat.CometChatException) => {
                    console.log("Message sending failed with error:", error);
                  }
                );
              } catch (error) {
                console.log(error);
              }
            }
          },
          (error: CometChat.CometChatException) => {
            console.log("Some Error Occured", { error });
          }
        );
      },
      (error: CometChat.CometChatException) => {
        console.log("Initialization failed with error:", error);
      }
    );
  };
  return (
    <div>
      {/* <button onClick={CheckUser}>Click on Me</button> */}
      <input type="image" id="inputImg" title="inputimg"/>
    </div>
  );
}
