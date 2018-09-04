// import ParamsStore from "../stores/ParamsStore";
import FieldsStore from "../stores/FieldsStore";

export default class RootStore {
  constructor() {
    // this.paramsStore = new ParamsStore();
    this.fieldsStore = new FieldsStore();
  }
}
