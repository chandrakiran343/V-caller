/* eslint-disable prettier/prettier */
import AgoraRTC from "agora-rtc-sdk-ng";
import { RouterLink } from "vue-router";
import { joinRoom, leaveRoom } from "./queries/CreateUser";



export default async function startBasicCall(options, channelParameters) {
  // Create an instance of the Agora Engine
  if (options && channelParameters) { 
    console.log(options.channel, options.uid)
    const agoraEngine = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    // Dynamically create a container in the form of a DIV element to play the remote video track.
    const remotePlayerContainer = document.getElementById("remote-player");
    console.log(remotePlayerContainer);
    // Dynamically create a container in the form of a DIV element to play the local video track.
    //   const localPlayerContainer = document.createElement("div");
    const localPlayerContainer = document.getElementById("local-player"); 
    console.log(options.uid, options)
    // Specify the ID of the DIV container. You can use the uid of the local user.
    localPlayerContainer.id = options.uid;
    // Set the textContent property of the local video container to the local user id.
    // localPlayerContainer.textContent = "Local user " + options.uid;
    // Set the local video container size.
    console.log(options)
    
    // Listen for the "user-published" event to retrieve a AgoraRTCRemoteUser object.
    agoraEngine.on("user-published", async (user, mediaType) => {
      // Subscribe to the remote user when the SDK triggers the "user-published" event.
      await agoraEngine.subscribe(user, mediaType);
      console.log("subscribe success");
      // Subscribe and play the remote video in the container If the remote user publishes a video track.
      if (mediaType == "video") {
        // Retrieve the remote video track.
        channelParameters.remoteVideoTrack = user.videoTrack;
        // Retrieve the remote audio track.
        channelParameters.remoteAudioTrack = user.audioTrack;
        // Save the remote user id for reuse.
        channelParameters.remoteUid = user.uid.toString();
        // Specify the ID of the DIV container. You can use the uid of the remote user.
        remotePlayerContainer.id = user.uid.toString();
        channelParameters.remoteUid = user.uid.toString();
        remotePlayerContainer.textContent = "Remote user " + user.uid.toString();
        // Append the remote container to the page body.
        // document.body.append(remotePlayerContainer);
        // Play the remote video track.
        channelParameters.remoteVideoTrack.play(remotePlayerContainer);
      }
      // Subscribe and play the remote audio track If the remote user publishes the audio track only.
      if (mediaType == "audio") {
        // Get the RemoteAudioTrack object in the AgoraRTCRemoteUser object.
        channelParameters.remoteAudioTrack = user.audioTrack;
        // Play the remote audio track. No need to pass any DOM element.
        channelParameters.remoteAudioTrack.play();
      }
      // Listen for the "user-unpublished" event.
      agoraEngine.on("user-unpublished", (user) => {
        console.log(user.uid + "has left the channel");
      });
    });

      // Listen to the Join button click event.
      document.getElementById("join").onclick = async function () {
        // Join a channel.
        // this.router.push("/play")
        console.log(this)
        await joinRoom(options.channel)
        await agoraEngine.join(
          options.appId,
          options.channel,
          options.token,
          options.uid
        );
        // Create a local audio track from the audio sampled by a microphone.
        channelParameters.localAudioTrack =
          await AgoraRTC.createMicrophoneAudioTrack();
        // Create a local video track from the video captured by a camera.
        channelParameters.localVideoTrack =
          await AgoraRTC.createCameraVideoTrack();
        // Append the local video container to the page body.
        // document.body.append(localPlayerContainer);
        // Publish the local audio and video tracks in the channel.
        await agoraEngine.publish([
          channelParameters.localAudioTrack,
          channelParameters.localVideoTrack,
        ]);
        // Play the local video track.
        channelParameters.localVideoTrack.play(localPlayerContainer);
        console.log("publish success!");
      };
      // Listen to the Leave button click event.
      document.getElementById("leave").onclick = async function () {

        // Destroy the local audio and video tracks.
        await leaveRoom()
        channelParameters.localAudioTrack.close();
        channelParameters.localVideoTrack.close();
        // Remove the containers you created for the local video and remote video.
        // removeVideoDiv(remotePlayerContainer.id);
        // removeVideoDiv(localPlayerContainer.id);
        // Leave the channel
        await agoraEngine.leave();
        console.log("You left the channel");
        // Refresh the page for reuse
        // window.location.reload();
      };
    // };

  }
}
startBasicCall();
// Remove the video stream from the container.
function removeVideoDiv(elementId) {
  console.log("Removing " + elementId + "Div");
  let Div = document.getElementById(elementId);
  if (Div) {
    Div.remove();
  }
}
