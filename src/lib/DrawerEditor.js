import log from 'sistemium-telegram/services/log';

const { error } = log('DrawerEditor');

export default {
  props: {
    from: Object,
  },
  data() {
    return {
      loadingMessage: null,
      drawerOpen: false,
      model: null,
    };
  },
  created() {
    this.$nextTick(() => {
      this.drawerOpen = true;
    });
  },
  computed: {
    loading() {
      return !!this.loadingMessage;
    },
    changed() {
      const { model } = this;
      return model && true; // !!!(model.hasChanges() || model.isNew())
    },
  },
  methods: {

    handleClose() {
      this.$router.replace(this.from)
        .catch(e => error('handleClose', e));
    },

    cancelClick() {
      const { drawer } = this.$refs;
      drawer.closeDrawer();
    },

    async performOperation(op) {

      this.showLoading();

      try {
        await op();
        this.hideLoading();
        this.cancelClick();
      } catch (e) {
        this.hideLoading();
        this.showError(e);
      }

    },

    showError(e) {
      return this.$message.error({
        message: e.message,
        offset: 1,
        duration: 15000,
        showClose: true,
      });
    },

    showLoading() {
      this.loadingMessage = this.$message({
        message: 'Saugomas ...',
        duration: 0,
      });
    },

    hideLoading() {
      if (!this.loadingMessage) {
        return;
      }
      this.loadingMessage.close();
      this.loadingMessage = null;
    },

  },
};
