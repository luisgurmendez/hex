import RenderElement from "@/render/renderElement";
import { Dimensions } from "@/core/canvas";
import Camera from "@/core/camera";

class RenderController {
  private static instance: RenderController;

  private constructor(private canvasRenderingContext: CanvasRenderingContext2D, private camera: Camera) { }

  public static getInstance(): RenderController {
    if (!RenderController.instance) {
      const camera: Camera = null as any;
      const canvasRenderingContext: CanvasRenderingContext2D = null as any;
      RenderController.instance = new RenderController(canvasRenderingContext, camera);
    }

    return RenderController.instance;
  }

  render(elements: RenderElement[]) {
    this.canvasRenderingContext.font = "25px Comic Sans MS";
    // Rendering
    this.clearCanvas(this.canvasRenderingContext);
    this.sortRenderElements(elements);

    // render normal elements..
    this.safetlyRender(this.canvasRenderingContext, () => {
      this.canvasRenderingContext.translate(Dimensions.w / 2, Dimensions.h / 2);
      this.canvasRenderingContext.scale(this.camera.zoom, this.camera.zoom);
      this.canvasRenderingContext.translate(-this.camera.position.x, -this.camera.position.y);
      elements.forEach((element) => {
        this.renderElement(element, { canvasRenderingContext: this.canvasRenderingContext });
      });
    });
  }

  private clearCanvas(canvasRenderingContext: CanvasRenderingContext2D) {
    const canvas = canvasRenderingContext.canvas;
    canvasRenderingContext.clearRect(
      -1,
      -1,
      canvas.width + 1,
      canvas.height + 1
    );
  }

  private safetlyRender(
    canvasRenderingContext: CanvasRenderingContext2D,
    render: () => void
  ) {
    canvasRenderingContext.save();
    render();
    canvasRenderingContext.restore();
  }

  private sortRenderElements(renderElements: RenderElement[]) {
    renderElements.sort((a, b) => a.zIndex - b.zIndex);
  }

  private renderElement(element: RenderElement, gctx: any) {

    if (element.saftly) {
      this.safetlyRender(gctx.canvasRenderingContext, () =>
        element.render(gctx)
      );
    } else {
      element.render(gctx);
    }

    this.sortRenderElements(element.children);
    element.children.forEach((child) => {
      this.renderElement(child, gctx);
    });
  }
}

export default RenderController;
