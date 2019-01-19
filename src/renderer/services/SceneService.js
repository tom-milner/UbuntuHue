import Api from "@/services/Api.js"

export default {
  getAll() {
    return Api().get("scenes");
  },

  setScene(id, scene) {

    return Api().put(`groups/${id}/action`, {
      scene: scene
    })
  }
}