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
    console.log(hs_split);
    const client = sdk.createClient({
      baseUrl: "https://matrix.org",
      accessToken: this.$store.state.token,
      userId: "@" + this.$store.state.username + ":" + hs_split,
    });
    // client.initCrypto()
    client.startClient({ initialSyncLimit: 10 });
    client.once("sync", function (state, prevState, res) {
      console.log(state); // state will be 'PREPARED' when the client is ready to use
    });
    client.on("Room.timeline", function (event, room, toStartOfTimeline) {
      console.log(event.event);
    });
    var rooms = client.getRooms();
    let room_state = [];
    rooms
      .forEach((room) => {
        room_state.push({
          icon: "mdi-chart-bubble",
          title: room.name,
          roomId: room.roomId,
        });
      })
      .then((response) => {
        this.$store.state.rooms = room_state;
      });
  },
  methods: {},
};
</script>
