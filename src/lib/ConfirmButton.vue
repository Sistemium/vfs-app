<template lang="pug">

el-badge.countdown(:value="countdown" :hidden="!countdown")
  el-button.confirm-button(
  :type="buttonType"
  :class="countdown && 'confirmation'"
  :size="size"
  @click="onClick"
  :disabled="disabled"
  )
    span {{ buttonText }}

</template>
<script>

export default {

  name: 'ConfirmButton',

  props: {
    disabled: Boolean,
    text: String,
    size: {
      type: String,
    },
    type: {
      type: String,
      default: 'default',
    },
    confirmText: String,
    timeout: {
      type: Number,
      default: 5000,
    },
  },

  data() {
    return {
      confirmation: false,
      countdown: null,
      interval: false,
    };
  },

  computed: {

    buttonText() {
      return this.confirmation ? this.confirmText || `${this.text}?` : this.text;
    },

    buttonType() {
      return this.confirmation ? 'warning' : this.type;
    },

  },

  methods: {

    onClick() {

      const onTimeout = () => {
        this.confirmation = false;
        clearInterval(this.interval);
        this.countdown = 0;
      };

      const onCountdown = () => {
        this.countdown -= 1;
      };

      const { confirmation } = this;

      if (confirmation) {
        clearTimeout(confirmation);
        onTimeout();
        this.$emit('confirm');
      } else {
        this.confirmation = setTimeout(onTimeout, this.timeout);
        this.countdown = 5;
        this.interval = setInterval(onCountdown, 1000);
      }

    },
  },

};

</script>
