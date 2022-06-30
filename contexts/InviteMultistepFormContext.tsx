import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import moment from "moment";
import {
  DisplayedTimezone,
  GetUserDocument,
  InviteFragment,
  Location,
  useCreateInviteMutation,
  useUpdateInviteMutation,
} from "../graphql/generated/types";
import { useUserContext } from "./UserContext";

type NumberOptionsType = Array<{ value: number; label: string }>;
type StringOptionsType = Array<{ value: string; label: string }>;

interface InviteMultistepFormContextProps {
  inviteInfo: InviteFragment;
  setInviteInfo: React.Dispatch<React.SetStateAction<InviteFragment>>;
  locationOptions: StringOptionsType;
  durationOptions: NumberOptionsType;
  slotIncrementOptions: NumberOptionsType;
  dateRangeOptions: NumberOptionsType;
  timeOptions: StringOptionsType;
  minimumNoticeOptions: NumberOptionsType;
  displayedTimezoneOptions: StringOptionsType;
  now: moment.Moment;
  step: number;
  previousStep: () => void;
  nextStep: () => void;
  setAction: React.Dispatch<React.SetStateAction<"create" | "update">>;
  isDoingAction: boolean;
}

interface InviteMultistepFormContextProviderProps {
  children: React.ReactNode;
}

const defaultInviteInfo = {
  name: "",
  description: "",
  location: Location.GoogleMeet,
  duration: 30,
  slotIncrement: 30,
  dateRange: 7,
  intervals: [[], [], [], [], [], [], []],
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  minimumNotice: 15,
  displayedTimezone: DisplayedTimezone.Local,
  id: "",
  events: [],
};

const InviteMultistepFormContext = createContext<InviteMultistepFormContextProps>({
  inviteInfo: defaultInviteInfo,
  setInviteInfo: () => {},
  locationOptions: [],
  durationOptions: [],
  slotIncrementOptions: [],
  dateRangeOptions: [],
  timeOptions: [],
  minimumNoticeOptions: [],
  displayedTimezoneOptions: [],
  now: moment(),
  step: 0,
  previousStep: () => {},
  nextStep: () => {},
  setAction: () => {},
  isDoingAction: false,
});

export const InviteMultistepFormContextProvider = ({ children }: InviteMultistepFormContextProviderProps) => {
  const [createInvite, { loading: isCreatingInvite }] = useCreateInviteMutation({ refetchQueries: [GetUserDocument] });
  const [updateInvite, { loading: isUpdatingInvite }] = useUpdateInviteMutation({ refetchQueries: [GetUserDocument] });

  const { user } = useUserContext();
  const [inviteInfo, setInviteInfo] = useState<InviteFragment>(defaultInviteInfo);
  const [action, setAction] = useState<"create" | "update">("create");
  const [step, setStep] = useState(0);

  const locationOptions: StringOptionsType = useMemo(
    () => [
      {
        value: Location.GoogleMeet,
        label: "Google Meet",
      },
    ],
    []
  );

  const durationOptions: NumberOptionsType = useMemo(
    () => [
      {
        value: 5,
        label: "5 minutes",
      },
      {
        value: 15,
        label: "15 minutes",
      },
      {
        value: 30,
        label: "30 minutes",
      },
      {
        value: 60,
        label: "1 hour",
      },
      {
        value: 120,
        label: "2 hours",
      },
    ],
    []
  );

  const slotIncrementOptions: NumberOptionsType = useMemo(
    () => [
      {
        value: 5,
        label: "5 minutes",
      },
      {
        value: 10,
        label: "10 minutes",
      },
      {
        value: 15,
        label: "15 minutes",
      },
      {
        value: 20,
        label: "20 minutes",
      },
      {
        value: 30,
        label: "30 minutes",
      },
      {
        value: 60,
        label: "1 hour",
      },
      {
        value: 120,
        label: "2 hours",
      },
    ],
    []
  );

  const dateRangeOptions: NumberOptionsType = useMemo(
    () => [
      {
        value: 3,
        label: "3 days into the future",
      },
      {
        value: 7,
        label: "1 week into the future",
      },
    ],
    []
  );

  const timeOptions: StringOptionsType = useMemo(
    () =>
      Array((24 * 60 - inviteInfo.slotIncrement) / inviteInfo.slotIncrement + 1)
        .fill(null)
        .map((_, index) => {
          const hour = Math.floor((index * inviteInfo.slotIncrement) / 60);
          const minute = (index * inviteInfo.slotIncrement) % 60;

          const hourText = (hour % 12 === 0 ? 12 : hour % 12).toString();
          const minuteText = minute < 10 ? "0" + minute.toString() : minute.toString();
          const period = hour < 12 ? "am" : "pm";

          return {
            value: JSON.stringify([hour, minute]),
            label: `${hourText}:${minuteText} ${period}
              `,
          };
        }),
    [inviteInfo.slotIncrement]
  );

  const minimumNoticeOptions: NumberOptionsType = useMemo(
    () => [
      {
        value: 15,
        label: "15 minutes",
      },
      {
        value: 60,
        label: "1 hour",
      },
    ],
    []
  );

  const displayedTimezoneOptions: StringOptionsType = useMemo(
    () => [
      {
        value: DisplayedTimezone.Local,
        label: "Invitee Local Timezone",
      },
      {
        value: DisplayedTimezone.Locked,
        label: "Locked Timezone",
      },
    ],
    []
  );

  const now = useMemo(() => moment(), []);

  const previousStep = useCallback(() => setStep(step - 1), [step]);

  const nextStep = useCallback(async () => {
    if (step !== 2) {
      setStep(step + 1);
      return;
    }

    const intervals: Array<{ at: string; duration: number }> = [];

    for (let i = 0; i < inviteInfo.dateRange; i++) {
      inviteInfo.intervals[i].forEach((interval: Array<number>) => {
        intervals.push({
          at: `${moment(now).add(i, "days").format("YYYY-MM-DD")}T${interval[0] < 10 ? "0" : ""}${interval[0]}:${
            interval[1] < 10 ? "0" : ""
          }${interval[1]}:00`,
          duration: 60 * (interval[2] - interval[0]) + (interval[3] - interval[1]),
        });
      });
    }

    if (action === "create")
      await createInvite({
        variables: {
          input: {
            userId: user?.id!,
            intervals,
            name: inviteInfo.name,
            description: inviteInfo.description,
            dateRange: inviteInfo.dateRange,
            displayedTimezone: inviteInfo.displayedTimezone,
            duration: inviteInfo.duration,
            location: inviteInfo.location,
            slotIncrement: inviteInfo.slotIncrement,
            timezone: inviteInfo.timezone,
            minimumNotice: inviteInfo.minimumNotice,
          },
        },
      }).then(() => setStep(step + 1));
    else
      await updateInvite({
        variables: {
          input: {
            id: inviteInfo.id,
            intervals,
            name: inviteInfo.name,
            description: inviteInfo.description,
            dateRange: inviteInfo.dateRange,
            displayedTimezone: inviteInfo.displayedTimezone,
            duration: inviteInfo.duration,
            location: inviteInfo.location,
            slotIncrement: inviteInfo.slotIncrement,
            timezone: inviteInfo.timezone,
            minimumNotice: inviteInfo.minimumNotice,
          },
        },
      }).then(() => setStep(step + 1));
  }, [step, inviteInfo, action]);

  return (
    <InviteMultistepFormContext.Provider
      value={{
        inviteInfo,
        setInviteInfo,
        locationOptions,
        durationOptions,
        slotIncrementOptions,
        dateRangeOptions,
        timeOptions,
        minimumNoticeOptions,
        displayedTimezoneOptions,
        now,
        step,
        previousStep,
        nextStep,
        setAction,
        isDoingAction: isCreatingInvite || isUpdatingInvite,
      }}
    >
      {children}
    </InviteMultistepFormContext.Provider>
  );
};

export const useInviteMultistepFormContext = () => useContext(InviteMultistepFormContext);
