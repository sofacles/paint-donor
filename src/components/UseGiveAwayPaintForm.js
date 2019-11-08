
import { checkMismatches, validateAll, validateOneField, emptyErrors } from "./PaintFormValidationRules";
import { UseForm } from "./UseForm";

const UseGiveawayPaintForm = (submitCallback) => {
    return UseForm(submitCallback, { checkMismatches, validateAll, validateOneField, emptyErrors })
};

export default UseGiveawayPaintForm;

