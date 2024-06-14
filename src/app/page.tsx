"use client";

import Chat from "@/components/chat/Chat";
import UploadBtn from "@/components/uploadbtn/Uploadbtn";

import { CometChat } from "@cometchat/chat-sdk-javascript";
import { useEffect, useState } from "react";
export default function Home() {
  const [inputfile, setinputfile] = useState<File | null>(null);
  let [extensionOfImg, setextensionOfImg] = useState<string>("");

  const GetFile = (evt: any) => {
    let file = evt.target.files[0];
    console.log(file);
    setinputfile(file);
    extensionOfImg = file?.name.split(".")[1];
    setextensionOfImg(extensionOfImg);
  };

  const UserLogin = async () => {
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
        var UID: string = "superhero5",
          authKey: string = "7e831a8f5a61828cd004722973cf6e5fede3852b";
        var authtoken = "superhero5_171834284444d2e2ee9b6ef61059ffc677d2ffd7";
        CometChat.getLoggedinUser().then(
          (user: CometChat.User | null) => {
            if (!user) {
              CometChat.login(authtoken).then(
                // CometChat.login(UID, authKey).then(
                (user: CometChat.User) => {
                  console.log("Login Successful:", { user });
                },
                (error: CometChat.CometChatException) => {
                  console.log("Login failed with exception:", { error });
                }
              );
            } else {
              // console.log("Already logged in");
              CometChat.logout().then(
                (loggedOut: Object) => {
                  console.log("Logout completed successfully");
                },
                (error: CometChat.CometChatException) => {
                  console.log("Logout failed with exception:", { error });
                }
              );

              // for send input type file

              let receiverID: string = "12",
                messageType: string = CometChat.MESSAGE_TYPE.FILE,
                // messageType: string = CometChat.MESSAGE_TYPE.IMAGE -->,
                receiverType: string = CometChat.RECEIVER_TYPE.USER,
                mediaMessage: CometChat.MediaMessage =
                  new CometChat.MediaMessage(
                    receiverID,
                    inputfile,
                    // "" -->,
                    messageType,
                    receiverType
                  );

              //This function is also used for upload img -->

              // let file: Object = {
              //   name: inputfile?.name,
              //   extension: extensionOfImg,
              //   mimeType: inputfile?.type,
              //   url: "https://pngimg.com/uploads/mario/mario_PNG125.png",
              // };

              // let attachment: CometChat.Attachment = new CometChat.Attachment(
              //   file
              // );

              // mediaMessage.setAttachment(attachment);
              // <--->

              // Repeated
              // <---->
              // CometChat.sendMediaMessage(mediaMessage).then(
              //   (message: any) => {
              //     console.log("Media message sent successfully", message);
              //   },
              //   (error: CometChat.CometChatException) => {
              //     console.log("Media message sending failed with error", error);
              //   }
              // );
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
    <>
      {/* <UploadBtn/> */}
      {/* <button onClick={UserLogin}>Click here</button>
      <input
        onChange={GetFile}
        type="file"
        name="img_file"
        id="img_file"
        title="file"
      /> */}
      <Chat/>
    </>
  );
}
