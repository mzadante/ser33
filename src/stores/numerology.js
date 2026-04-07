import { defineStore } from 'pinia';

export const useNumerologyStore = defineStore('numerology', {
  state: () => ({
    formData: {
      computedName: '',
      birthDate: ''
    },
    results: null,
    selectedNumber: null
  }),
  actions: {
    setFormData(name, date) {
      this.formData.computedName = name;
      this.formData.birthDate = date;
    },
    setResults(data) {
      this.results = data;
    },
    setSelectedNumber(numData) {
      this.selectedNumber = numData;
    },
    clearResults() {
      this.results = null;
      this.selectedNumber = null;
      this.formData.computedName = '';
      this.formData.birthDate = '';
    }
  }
});
