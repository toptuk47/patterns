import { type AbstractExpression } from "./AbstractExpression";
import { TextContext } from "../TextContext";

export class QuotesToGuillemetsRule implements AbstractExpression {
  interpret(context: TextContext): void {
    let text = context.getText();
    let result = "";
    let inside = false; // внутри кавычек или нет
    for (const ch of text) {
      if (ch === '"') {
        result += inside ? "»" : "«";
        inside = !inside;
      } else {
        result += ch;
      }
    }
    context.setText(result);
  }
}
