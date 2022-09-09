import { Alert } from "@vismaux/react-nc4";
import React from "react";
import { SafeParseReturnType } from "zod/lib/types";
//
import Conditional from "./Conditional";
import { hasValue } from "../utils";

interface Props {
  validationResult: SafeParseReturnType<any, any>;
}

/**
 * Note that TypeScript does not understand that the outcome of 'condition' decides
 *  that the 'valid' OR 'invalid' branch of SafeParseReturnType should be used,
 *  so we have to check inside the UL a second time which one is applicable.
 */
const ValidationErrorsList = ({ validationResult }: Props) => (
  <Conditional
    condition={
      !validationResult.success && hasValue(validationResult.error?.issues)
    }
  >
    <Alert type="danger">
      <ul>
        {
          !validationResult.success
            ? validationResult.error?.issues.map((issue) => (
                <li key={issue.path[0] + issue.code}>
                  <em>{issue.path}</em> is {issue.message}
                </li>
              ))
            : null /* React prefers null for no render */
        }
      </ul>
    </Alert>
  </Conditional>
);

export default ValidationErrorsList;
