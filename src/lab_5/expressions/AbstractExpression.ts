import { TextContext } from "../TextContext";

export interface AbstractExpression {
  interpret(context: TextContext): void;
}
