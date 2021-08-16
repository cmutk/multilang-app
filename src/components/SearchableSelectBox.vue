<template>
  <label class="dropdown" :class="labelClass">
    <span class="input-title">{{ Title }}</span>
    <input
      :class="inputClass"
      type="select"
      v-model.trim="countryInput"
      @focus="handleFocus"
      @blur="hideDropdown"
    />
    <div v-show="showDropdown" class="dropdown-list" :class="dropDownListClass">
      <div
        class="dropdown-item"
        v-for="item in List"
        @click="selectItem(item)"
        v-show="itemsVisible(item)"
        :key="item.id"
      >
        {{ item.name }}
      </div>
    </div>
    <span class="validation-message">{{ errorMessage }}</span>
  </label>
</template>
<script>
export default {
  name: "SearchableSelectBox",
  props: {
    Title: {
      type: String,
    },
    List: {
      type: Array,
    },
    labelClass: {
      type: String,
    },
    errorMessage: {
      type: String,
    },
    inputClass: {
      type: Array,
    },
    dropDownListClass: {
      type: Array,
    },
  },
  data() {
    return {
      showDropdown: false,
      countryInput: "",
      selectedItem: "",
    };
  },
  methods: {
    itemsVisible(item) {
      let currentName = item.name.toLowerCase();
      let currentInput = this.countryInput.toLowerCase();
      return currentName.includes(currentInput);
    },
    handleFocus() {
      this.showDropdown = true;
    },
    selectItem(item) {
      this.selectedItem = item.name;
      this.countryInput = this.selectedItem;

      this.$emit("on-item-selected", item);
      console.log(item);
    },
    hideDropdown(e) {
      setTimeout(() => (e.target.blur(), (this.showDropdown = false)), 1000);
    },
  },
};
</script>
<style scoped>
label.dropdown:focus-within > input {
  outline: none;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-width: 2px 2px 0px 2px;
  border-style: solid;
  border-color: #2c3e50;
}
label.dropdown:focus-within > .dropdown-list {
  font-weight: normal;
}
.dropdown {
  position: relative;
  width: 100%;
  z-index: 0;
}
.dropdown > * {
  width: 100%;
}
.dropdown-list {
  width: 100%;
  padding: 8px;
  position: absolute;
  margin-top: 58px;
  background-color: white;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-width: 1px 2px 2px 2px;
  border-style: solid;
  border-color: #2c3e50;
}
.dropdown-item {
  padding: 8px;
  font-size: 14px;
  cursor: pointer;
}
.dropdown-item:hover {
  background-color: #42b983aa;
}
</style>
