import { type AbstractExpression } from "./AbstractExpression";
import { TextContext } from "../TextContext";

export class TabToSpacesRule implements AbstractExpression {
  interpret(context: TextContext): void {
    const text = context.getText();
    context.setText(text.replace(/\t/g, "    "));
  }
}
