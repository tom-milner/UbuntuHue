import Api from "@/services/Api.js"

export default {
  getAll() {
    return Api().get("groups");
  },
  setAllState(id, state) {
    return Api().put(`groups/${id}/action`, {
      on: state
    })
  }
}