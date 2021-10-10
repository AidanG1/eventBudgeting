<template>
  <v-row>
    <v-col class="text-center">
      <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      <h1>Login</h1>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="homeserver"
                label="Homeserver"
                clearable
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="username" label="Username" clearable />
            </v-col>
            <v-col cols="12" sm="6">
              <h6 v-if="error !== ''" style="color: red">
                {{error}}
              </h6>
              <v-text-field
                :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show_password ? 'text' : 'password'"
                name="input-10-2"
                label="Password"
                v-model="password"
                class="input-group--focused"
                @click:append="show_password = !show_password"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-btn
                color="primary"
                :disabled="allow_login"
                block
                depressed
                elevation="2"
                outlined
                raised
                type="submit"
                @click.prevent="login()"
                >Login</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
/* eslint-disable */
import * as sdk from "matrix-js-sdk";
export default {
  data() {
    return {
      homeserver: "https://matrix.org",
      username: "",
      password: "",
      show_password: false,
      error: "",
    };
  },
  computed: {
    allow_login() {
      if (this.username.length > 0 && this.password.length > 0) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    login() {
      const client = sdk.createClient(this.homeserver);
      client
        .login("m.login.password", {
          user: this.username,
          password: this.password,
        })
        .then((response) => {
          this.$store.commit("change_token", response.access_token);
          this.$store.commit("change_username", this.username);
          this.$store.commit("change_homeserver", this.homeserver);
          this.$router.push({ name: "rooms" });
        })
        .catch((error) => {
          console.log(error);
          console.log(typeof error);
          console.log(error["error"]);
          this.error = error.toString();
        });
    },
  },
};
</script>
