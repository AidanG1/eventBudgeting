<template>
  <div></div>
</template>

<script>
export default {
  name: "CurrentRoom",
  data() {
    return {
      hi: "",
    };
  },
  created() {
    const current_room = this.$store.state.current_room;
    // let client = this.$store.state.client;
    // client.on("Room.timeline", function (event, room, toStartOfTimeline) {
    //   if (room.roomId === this.$store.state.current_room) {
    //     if (event.getType() !== "m.room.message") {
    //       return; // only use messages
    //     }
    //     console.log(event.event.content.body);
    //   }
    // });
  },
};
</script>

