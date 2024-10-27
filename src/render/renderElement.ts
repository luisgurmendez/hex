import RandomUtils from "@/utils/random";

type TODO = any;

export type RenderFn = (gameContext: TODO) => void;

class RenderElement {
  _render: RenderFn;
  children: RenderElement[] = [];
  id = RandomUtils.generateId();
  zIndex = 1;
  saftly = false;

  constructor(render: RenderFn, saftly = false) {
    this._render = render;
    this.saftly = saftly;
  }

  render(gameContext: TODO) {
    this._render(gameContext);
  }
}

export default RenderElement;

export class NoRender extends RenderElement {
  constructor() {
    super(() => { });
  }
}
