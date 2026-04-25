import { type AbstractExpression } from "./AbstractExpression";
import { TextContext } from "../TextContext";

export class DashToEmDashRule implements AbstractExpression {
  interpret(context: TextContext): void {
    const text = context.getText();
    // Заменяем дефис, окружённый пробелами, на длинное тире
    context.setText(text.replace(/(?<=\s)-(?=\s)/g, "—"));
  }
}
