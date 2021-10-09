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
    return {
      client: $store.state.client,
    };
  },
  created() {
    let client = this.client;
    client.startClient();
    client.once("sync", function (state, prevState, res) {
      console.log(state); // state will be 'PREPARED' when the client is ready to use
    });
    client.on("Room.timeline", function (event, room, toStartOfTimeline) {
      console.log(event.event);
    });
    var rooms = client.getRooms();
    let room_state = [];
    rooms.forEach((room) => {
      room_state.push({
        icon: "mdi-chart-bubble",
        title: room.name,
        to: "/r/" + room.roomId.toString(),
      });
    });
    this.$store.state.rooms = room_state;
  },
  methods: {},
};
</script>
