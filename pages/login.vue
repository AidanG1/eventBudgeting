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
                v-model="matrix_homeserver"
                label="Your Homeserver"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="username"
                label="Username"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show_password ? 'text' : 'password'"
                name="input-10-2"
                label="Password"
                v-model="password"
                class="input-group--focused"
                @click:append="show_password = !show_password"
              ></v-text-field>
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
      matrix_homeserver: "https://matrix.org",
      username: "",
      password: "",
      show_password: false,
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
      const client = sdk.createClient(this.matrix_homeserver);
      client
        .login("m.login.password", {
          user: this.username,
          password: this.password,
        })
        .then((response) => {
          console.log(response.access_token);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
