import { GraphQLScalarType } from "graphql";
import { ApolloError } from "apollo-server-micro";

const AT_REGEX =
  /^(\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60))(\.\d{1,})?$/;

export type IntervalsType = Array<{
  at: string;
  duration: number;
}>;

const validateIntervalsType = (intervals: any): intervals is IntervalsType => {
  for (const interval of intervals) {
    if (
      typeof interval.at === "string" &&
      typeof interval.duration === "number" &&
      Object.keys(interval).length === 2 &&
      AT_REGEX.test(interval.at)
    )
      continue;

    return false;
  }

  return true;
};

const IntervalsScalar = new GraphQLScalarType({
  name: "IntervalsScalar",
  description: "A list of intervals",
  serialize(outputValue) {
    if (typeof outputValue !== "string")
      throw new ApolloError("[Serialize] Intervals object must be a stringified JSON");

    return JSON.parse(outputValue as string);
  },
  parseValue(inputValue) {
    if (typeof inputValue === "string")
      throw new ApolloError("[ParseValue] Intervals object must not be a stringified JSON");

    if (!validateIntervalsType(inputValue))
      throw new ApolloError("[Validation] Intervals object must provide a valid ISO datetime 'at' and 'duration'");

    return JSON.stringify(inputValue);
  },
});

export default IntervalsScalar;
