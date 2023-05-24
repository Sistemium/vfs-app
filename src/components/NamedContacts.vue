<template lang="pug">

.named-contacts

  .name.field
    i.el-icon-s-custom
    span.name(v-text="name")
    contact-info(:contact="mainEmail" v-if="mainEmail")

  .contacts(v-if="contacts.length")
    contact-info(
      v-for="contact in phones"
      :key="contact.id"
      :contact="contact"
    )
    template(v-if="!mainEmail")
      contact-info(
        v-for="contact in emails"
        :key="contact.id"
        :contact="contact"
      )


</template>
<script>

import filter from 'lodash/filter';
import ContactInfo from '@/components/ContactInfo.vue';

const NAME = 'NamedContacts';

export default {
  props: {
    name: String,
    contacts: Array,
  },
  computed: {
    mainEmail() {
      const { emails } = this;
      return emails.length === 1 && emails[0];
    },
    phones() {
      return filter(this.contacts, ({ contactMethod }) => contactMethod.code === 'phone');
    },
    emails() {
      return filter(this.contacts, ({ contactMethod }) => contactMethod.code === 'email');
    },
  },
  components: { ContactInfo },
  name: NAME,
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.contact-info {
  margin-right: $margin-right;
}

.contacts {
  display: flex;
  flex-wrap: wrap;
}

.named-contacts {
  display: block !important;
}

.name {
  .contact-info {
    margin-left: $margin-right;
  }
}
</style>
