<template lang="pug">

.contact-info
  i.type(:class="type")
  a(:href="contact.href()")
    strong.address {{ address }}
  small.info(v-if="contact.info" v-text="contact.info")

</template>
<script>

const NAME = 'ContactInfo';

export default {
  props: {
    contact: Object,
  },
  name: NAME,
  computed: {
    address() {
      const { contactMethod, address } = this.contact;
      if (!contactMethod) {
        return address;
      }
      switch (contactMethod.code) {
        case 'phone':
          return address.replace(/(\d{3})(\d{2})(\d{3})/, (p, n1, n2, n3) => `(${n1})${n2}-${n3}`);
        case 'email':
          return address.replace(/^[^@]+/, '');
        default:
          return null;
      }
    },
    type() {
      const { contactMethod } = this.contact;
      if (!contactMethod) {
        return null;
      }
      switch (contactMethod.code) {
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
}

a, .type {
  margin-right: $margin-right/2;
}

.info {
  color: $gray;
}

i {
  padding: 0 3px;
}

a {
  text-decoration: none;
}

</style>
