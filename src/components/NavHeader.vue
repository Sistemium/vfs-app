<template lang="pug">

.nav-header

  .left
    mt-button.prev(:plain="true" @click="prevClick" :disabled="!prev")
      i(v-if="prev" :class="leftIconClass")

  .title
    slot
      strong {{ title }}

  .right
    mt-button.prev(:plain="true" @click="nextClick" :disabled="!next")
      i.el-icon-arrow-right(v-if="next")
    .badge(v-if="rightBadge")
      mt-badge(type="warning" size="small") {{ rightBadge }}

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

.nav-header {

  background: $gray-background;

  //margin-bottom: 7px;
  padding: 2px 2px 3px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;

  .title {

    font-size: 120%;
    color: $black;

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

  .totals > * + * {
    margin-left: $margin-right;
  }

}

</style>
