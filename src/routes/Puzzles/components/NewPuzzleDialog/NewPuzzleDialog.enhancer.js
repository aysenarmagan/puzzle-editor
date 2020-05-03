import { reduxForm } from "redux-form";
import { NEW_PUZZLE_FORM_NAME } from "constants/formNames";

export default reduxForm({
  form: NEW_PUZZLE_FORM_NAME,
  // Clear the form for future use (creating another puzzle)
  onSubmitSuccess: (result, dispatch, props) => props.reset(),
});
