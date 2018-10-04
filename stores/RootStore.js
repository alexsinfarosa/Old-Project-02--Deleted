import FieldsStore from "../stores/FieldsStore";

export default class RootStore {
  constructor() {
    this.fieldsStore = new FieldsStore();
  }
}
