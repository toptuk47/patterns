import { type AbstractExpression } from "./AbstractExpression";
import { TextContext } from "../TextContext";

export class UnwantedSpacesRule implements AbstractExpression {
  interpret(context: TextContext): void {
    let text = context.getText();
    text = text.replace(/\(\s+/g, "(");
    text = text.replace(/\s+\)/g, ")");
    text = text.replace(/\s+,/g, ",");
    text = text.replace(/\s+\./g, ".");
    text = text.replace(/\s+;/g, ";");
    text = text.replace(/\s+:/g, ":");
    context.setText(text);
  }
}
