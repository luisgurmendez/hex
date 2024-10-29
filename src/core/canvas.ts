import { Rectangle } from "@/math/shapes";

export const Dimensions = new Rectangle(
  document.body.scrollWidth,
  document.body.scrollHeight
);

class CanvasGenerator {
  static generateCanvas() {
    let canvasRenderingContext: CanvasRenderingContext2D;
    const canvas = document.createElement("canvas");
    const containerEl = document.getElementById("c");
    canvas.id = "hexMapCanvas";
    if (containerEl) {
      const onContainerResize = () => {
        canvas.width = document.body.scrollWidth;
        canvas.height = document.body.scrollHeight;
        // canvasRenderingContext.imageSmoothingEnabled = true;
        canvasRenderingContext.translate(0.5, 0.5);
        canvasRenderingContext.scale(1.4, 1.4);
        Dimensions.w = canvas.width;
        Dimensions.h = canvas.height;
      };

      const possibleNullCanvasContext = canvas.getContext("2d");

      if (possibleNullCanvasContext === undefined) {
        throw ""; //Error('Browser doesnt support canvas!');
      }

      canvasRenderingContext = possibleNullCanvasContext!;
      onContainerResize();
      containerEl.appendChild(canvas);
      window.addEventListener("resize", onContainerResize);
    } else {
      throw ""; //Error('No canvas container');
    }

    return canvasRenderingContext;
  }
}

export default CanvasGenerator;
