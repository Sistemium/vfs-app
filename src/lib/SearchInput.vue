<template lang="pug">

.search-input
  el-input(
    prefix-icon="el-icon-search"
    v-model="searchText"
    :clearable="true"
    :size="size"
    placeholder="paieška"
  )
    el-button(
      slot="append"
      icon="el-icon-user"
      v-if ="contacts"
      @click="contactDialogVisible = true"
    )

  el-dialog(
    title="Kontaktai"
    :visible.sync="contactDialogVisible"
    :modalAppendToBody="false"
    width="75%"
    )

      .contacts(v-for="contact in contacts")

        h3(
          v-on:click="searchContact(contact.name)"
        ) {{contact.name}}

        p(
          v-for="phone in contact.phones"
          v-on:click="searchContact(phone)"
          ) {{phone}}

        p(
          v-for="email in contact.emails"
          v-on:click="searchContact(email)"
        ) {{email}}

</template>
<script>

import debounce from 'lodash/debounce';
import { requestFromDevice, isNative } from 'sistemium-vue/services/native';

export default {

  name: 'SearchInput',

  props: {
    value: String,
    size: {
      type: String,
      default: 'mini',
    },
    debounce: {
      type: Number,
      default: 500,
    },
  },

  data() {
    return {
      searchText: this.value,
      contacts: undefined,
      contactDialogVisible: false,
    };
  },

  methods: {
    getContacts() {
      if (!isNative()) return;
      requestFromDevice('getContacts').then(res => {
        this.contacts = res
          .sort((contact1, contact2) => (contact1.name > contact2.name ? 1 : -1));
      });
    },
    searchContact(contact) {
      this.searchText = contact;
      this.contactDialogVisible = false;
    },
  },

  // methods: {
  //   onInput: debounce(function onInput(value) {
  //     this.$emit('input', value);
  //   }, 500),
  // },

  created() {
    this.$watch('searchText', debounce(value => this.$emit('input', value), this.debounce));
    this.getContacts();
  },

};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.contacts{

  text-align: left;

  p{

    margin-left: $padding;

  }

}

</style>
