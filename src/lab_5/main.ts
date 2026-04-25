import { TextContext } from "./TextContext";
import { CompoundExpression } from "./expressions/CompoundExpression";
import { MultipleSpacesRule } from "./expressions/MultipleSpacesRule";
import { DashToEmDashRule } from "./expressions/DashToEmDashRule";
import { QuotesToGuillemetsRule } from "./expressions/QuotesToGuillemetsRule";
import { TabToSpacesRule } from "./expressions/TabToSpacesRule";
import { UnwantedSpacesRule } from "./expressions/UnwantedSpacesRule";
import { MultipleNewLinesRule } from "./expressions/MultipleNewLinesRule";

const inputArea = document.getElementById("input-text") as HTMLTextAreaElement;
const outputArea = document.getElementById(
  "output-text",
) as HTMLTextAreaElement;
const correctBtn = document.getElementById("correct-btn") as HTMLButtonElement;

correctBtn.addEventListener("click", () => {
  const context = new TextContext(inputArea.value);

  const corrector = new CompoundExpression();
  corrector.add(new MultipleSpacesRule());
  corrector.add(new DashToEmDashRule());
  corrector.add(new QuotesToGuillemetsRule());
  corrector.add(new TabToSpacesRule());
  corrector.add(new UnwantedSpacesRule());
  corrector.add(new MultipleNewLinesRule());

  corrector.interpret(context);

  outputArea.value = context.getText();
});
