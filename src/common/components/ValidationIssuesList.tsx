import { Alert } from "@vismaux/react-nc4";
import React from "react";
import { SafeParseReturnType } from "zod/lib/types";
//
import Conditional from "./Conditional";
import { hasValue} from "../utils";
import {ValidationIssues} from "../../domain/general";

interface Props {
  validationIssues: ValidationIssues;
}

/**
 * Note that TypeScript does not understand that the outcome of 'condition' decides
 *  that the 'valid' OR 'invalid' branch of SafeParseReturnType should be used,
 *  so we have to check inside the UL a second time which one is applicable.
 */
const ValidationIssuesList = ({ validationIssues = []}: Props) => (
  <Conditional
    condition={
      hasValue(validationIssues)
    }
  >
    <Alert type="danger">
      <ul>
        {
          hasValue(validationIssues)
            ? validationIssues.map((issue) => (
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

export default ValidationIssuesList;
