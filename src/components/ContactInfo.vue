<template lang="pug">

.contact-info
  i.type(:class="type")
  a(:href="contact.href()")
    strong.address {{ contact.address }}

</template>
<script>

const NAME = 'ContactInfo';

export default {
  props: {
    contact: Object,
  },
  name: NAME,
  computed: {
    type() {
      switch (this.contact.contactMethod.code) {
        case 'phone':
          return 'el-icon-phone';
        case 'email':
          return 'el-icon-message';
        default:
          return null;
      }
    },
  },
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.type {
  color: $green;
  margin-right: $margin-right/2;
}

i {
  padding: 3px;
}

a {
  text-decoration: none;
}

</style>
