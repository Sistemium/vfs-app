<template lang="pug">

.nav-header

  .top
    .left
      mt-button.prev(:plain="true" @click="prevClick" :disabled="!prev")
        i(v-if="prev" :class="leftIconClass")

    .title
      slot
        strong {{ title }}

    .right
      mt-button.next(:plain="true" @click="nextClick" :disabled="!next")
        i(v-if="next" :class="rightIcon")
      .badge(v-if="rightBadge")
        mt-badge(type="warning" size="small") {{ rightBadge }}
  slot(name="bottom")

</template>
<script>

export default {

  name: 'nav-header',

  props: {
    leftIcon: {
      type: String,
      default: 'arrow-left',
    },
    title: String,
    prev: Function,
    next: Function,
    rightBadge: String,
    rightIcon: {
      type: String,
      default: 'el-icon-arrow-right',
    },
  },

  computed: {
    leftIconClass() {
      return `el-icon-${this.leftIcon}`;
    },
  },

  methods: {
    prevClick() {
      this.prev();
    },
    nextClick() {
      this.next();
    },
  },

};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.right {

  position: relative;

  > .badge {
    position: absolute;
    top: -3px;
    right: 6px;
  }

}

.top {
  position: relative;
  justify-content: space-between;
  display: flex;
  align-items: center;

  & + * {
    margin-top: 6px;
  }
}

.nav-header {

  background: $gray-background;
  padding: 2px 2px 3px;
  text-align: center;
  min-height: 45px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .title {

    font-size: 120%;
    color: $dark-gray;

    a {
      position: relative;
      top: 1px;
      margin-left: $margin-top;
    }

    strong {
      font-weight: 700;
    }

    > * {
      display: block;
    }

  }

  .prev, .next {
    min-width: 45px;
    font-size: 130%;
    border: none;
  }

  i.el-icon-back {
    color: $primary-color;
  }

  .mint-button {
    height: 35px;
    padding: 0;
  }

}

</style>
