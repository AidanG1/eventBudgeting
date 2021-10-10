<template>
  <div>
    <h1>Rooms</h1>
    <h2>Token: {{ $store.state.token }}</h2>
    <CurrentRoom></CurrentRoom>
  </div>
</template>

<script>
/* eslint-disable */
import * as sdk from "matrix-js-sdk";
import CurrentRoom from "~/components/CurrentRoom.vue";
export default {
  components: {
    CurrentRoom,
  },
  data() {
    return {};
  },
  created() {
    const hs_split = this.$store.state.homeserver.split("https://")[1];
    const client = sdk.createClient({
      baseUrl: "https://matrix.org",
      accessToken: this.$store.state.token,
      userId: "@" + this.$store.state.username + ":" + hs_split,
    });
    // client.initCrypto()
    client.startClient({ initialSyncLimit: 10 });
    client.once("sync", function (state, prevState, res) {
      console.log(state); // state will be 'PREPARED' when the client is ready to use
      var rooms = client.getRooms();
      console.log("Getting rooms");
      console.log(rooms)
      rooms.forEach((room) => {
        console.log(room.roomId);
      });
    });
    let room_ids = [];
    console.log('Line 38')
    client.on("Room.timeline", function (event, room, toStartOfTimeline) {
      if (!room_ids.contains(event.event.room_id)) {
        this.$store.state.add_room(event.event.room_id);
      }
      console.log(event.event);
    });
    // client.getRooms().then((reponse) => {
    //   let room_state = [];
    //   response.forEach((room) => {
    //     room_state.push({
    //       icon: "mdi-chart-bubble",
    //       title: room.name,
    //       roomId: room.roomId,
    //     });
    //   });
    //   this.$store.state.rooms = room_state;
    // });
  },
  methods: {},
};
</script>
