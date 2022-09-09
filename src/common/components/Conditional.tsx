import React, { FC } from "react";
import PropTypes from "prop-types";

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.array.isRequired,
  ]),
  condition: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).isRequired,
};

// infer TypeScript Type from PropTypes
type Props = PropTypes.InferProps<typeof propTypes>;

/**
 * Component that renders something if a predicate function (condition) is true
 * @param props - can contain condition prop that should be a boolean or a predicate function.
 * @return {JSX.Element|null}
 */
const Conditional: FC<Props> = (props) => {
  const isTrue =
    typeof props.condition === "boolean" ? props.condition : props.condition();
  return isTrue ? <>{props.children}</> : null;
};

Conditional.propTypes = propTypes;

Conditional.defaultProps = {
  condition: true,
};

export default Conditional;
