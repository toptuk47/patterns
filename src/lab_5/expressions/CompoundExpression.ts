import { type AbstractExpression } from "./AbstractExpression";
import { TextContext } from "../TextContext";

export class CompoundExpression implements AbstractExpression {
  private children: AbstractExpression[] = [];

  add(expr: AbstractExpression): void {
    this.children.push(expr);
  }

  interpret(context: TextContext): void {
    for (const child of this.children) {
      child.interpret(context);
    }
  }
}
