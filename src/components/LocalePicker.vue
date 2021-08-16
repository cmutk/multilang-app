<template>
  <select
    v-model="selected"
    @change="handleRoute(selected)"
    :class="classFromTop"
  >
    <option v-for="locale in locales" :value="locale.value" :key="locale.value">
      {{ locale.name }}
    </option>
  </select>
</template>
<script>
export default {
  name: "LocalePicker",
  props: ["classFromTop"],
  data() {
    return {
      selected: this.$i18n.locale,
      locales: [
        { value: "tr", name: "TR" },
        { value: "en", name: "EN" },
      ],
    };
  },
  methods: {
    handleRoute(lang) {
      if (this.$i18n.locale !== lang) {
        this.$i18n.locale = lang;
      }
      const _to = this.$router.resolve({ params: { lang } });
      this.$router.push(_to.fullPath);
    },
  },
};
</script>
<style scoped>
select {
  outline: none;
  padding: 14px 16px;
  margin: 0px 16px 0px 0px;
  border-color: white;
  border-style: solid;
  border-width: 0px 0px 2px 0px;
  cursor: pointer;
  font-weight: bold;
  color: #2c3e50;
  font-size: 14px;
}
select:hover,
select:focus {
  color: #42b983;
  border-bottom: 2px solid #42b983;
}
select:focus > option {
  color: #2c3e50;
}
</style>
