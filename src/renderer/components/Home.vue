<template>
  <div class="home">
    <div :class="{'button--active':(isOn)}" class="home__power button" v-on:click="lightToggle()">
      <!-- <img class="home__power__switch" src="../assets/switch.svg"> -->
      {{message}}
    </div>
    <div class="home__scene button" @click="toggleScene()">{{scene[1].name}}</div>
  </div>
</template>

<script>
import GroupService from "../services/GroupService";
import SceneService from "../services/SceneService";

export default {
  data() {
    return {
      isOn: false,
      message: "Off",
      scene: "",
      scenes: {},
      sceneNo: 1
    };
  },
  methods: {
    lightToggle: function() {
      this.isOn = !this.isOn;
      GroupService.setAllState(1, this.isOn);
    },

    toggleScene: function() {
      if (this.sceneNo == this.scenes.length - 1) {
        this.sceneNo = 1;
      }
      this.scene = this.scenes[this.sceneNo];
      this.sceneNo++;
    },

    checkStates: async function() {
      let res = (await GroupService.getAll()).data[1];
      let state = res.state.all_on;
      this.isOn = state;
    } //,
    // checkScenes: async function() {
    //   let tempScenes = (await SceneService.getAll()).data;
    //   let currScene = Object.keys(tempScenes)[0];
    //   this.scene = currScene;
    // }
  },

  mounted: function() {
    window.setInterval(() => {
      this.checkStates();
      // this.checkScenes();
    }, 1000);
  },

  watch: {
    scene: function() {
      SceneService.setScene(1, this.scene[0]);
      this.isOn = true;
    },
    isOn: function() {
      if (this.isOn) {
        this.message = "On";
      } else {
        this.message = "Off";
      }
    }
  },

  async beforeCreate() {
    let data = (await SceneService.getAll()).data;
    this.scenes = Object.entries(data);
    this.toggleScene();
  }
};
</script>

<style lang='scss' scoped>
@import "../scss/main.scss";
.home {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  // background-color: $color-background;
  background-image: linear-gradient(
    to bottom,
    $color-background-light,
    $color-background-dark
  );
  height: 100vh;
  width: 100%;
  padding: 2rem;

  &__power {
    height: 12rem;
    width: 12rem;
    border-radius: 50%;
    text-transform: uppercase;
    // letter-spacing: 0.5rem;
    text-align: center;
    font-size: 4rem;
    font-weight: 200;

    &__switch {
      height: 9rem;
      // fill: $color-white;
    }
  }

  &__scene {
    height: 5rem;
    width: 15rem;
    // text-transform: uppercase;
    font-weight: 400;
    letter-spacing: 0.2rem;
  }
}
</style>
