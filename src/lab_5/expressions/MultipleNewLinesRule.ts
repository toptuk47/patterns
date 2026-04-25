import { type AbstractExpression } from "./AbstractExpression";
import { TextContext } from "../TextContext";

export class MultipleNewLinesRule implements AbstractExpression {
  interpret(context: TextContext): void {
    const text = context.getText();
    context.setText(text.replace(/\n{2,}/g, "\n"));
  }
}
