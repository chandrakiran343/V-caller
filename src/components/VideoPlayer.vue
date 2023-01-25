<!-- eslint-disable prettier/prettier -->

<script setup>
import { NButton, NSpace, NInput,NSkeleton } from 'naive-ui'
import { store } from "./UsersList.vue"
import startBasicCall from "../AgoraAPI.js"
import { auth } from "../firebase"
defineProps({
  user: {
    required: true,
  },
});
</script> 

<template>
    <div class="componentwrap">
      <div class="videowrap">
          <div class="videowrapper" id="local-player">Local User</div>
          <div class="videowrapper" id="remote-player">Remote User</div>
      </div>
    <div class="buttongroup">
        <n-space>
            <n-button id="join" type="primary">Join</n-button>
            <n-button id="leave" type="error">Leave</n-button>
        </n-space>
    </div>
</div>
</template>

<script>

// startBasicCall(this.options, this.channelParameters)
export default {
  data() {
    return {
      join: false,
    }
  },
  mounted() {
    startBasicCall({
      appId: import.meta.env.VITE_APP_API,
      // Set the channel name.q
      channel: "common",
      // Pass your temp token here.
      token: "007eJxTYODtTRW5v15nY/lxpsMT87xMGlb4TjMonW14Te/L5Sb36N8KDClmSUaJScnJpmZpSSbmxmlJxqnmSWmJFkYWhqnGxknGJi+6khsCGRnsbecwMTJAIIjPxpCcn5ubn8fAAACOhiB6",
      // Set the user ID.
      uid: auth.currentUser.uid,
    }, {
      localAudioTrack: null,
      // A variable to hold a local video track.
      localVideoTrack: null,
      // A variable to hold a remote audio track.
      remoteAudioTrack: null,
      // A variable to hold a remote video track.
      remoteVideoTrack: null,
      // A variable to hold the remote user id.s
      remoteUid: null
    });
  }
}

</script>
<style>
.componentwrap{
        display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          gap: 1rem;
    } 

.buttongroup {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
}
.videowrap {
  display: flex;
  justify-content: center;
  align-items: center;
  gap:1rem;
  width: 100%;
  height: 100%;
  /* background-color: red; */
}
.videowrapper{
  width: 50%;
  height:90%;
  /* background-color: blue; */
}
@media screen and (max-width: 600px) {
  .videowrapper:nth-child(1){
    display: none;
  }
  .videowrapper:nth-child(2){
    width: 100%;
  }
}
</style>
