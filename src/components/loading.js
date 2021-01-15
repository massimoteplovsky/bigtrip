import Abstract from "./abstract.js";

const createNoTaskTemplate = () => {
  return `<p class="board__no-tasks">
    Loading...
  </p>`;
};

export default class Loading extends Abstract {
  getTemplate() {
    return createNoTaskTemplate();
  }
}
