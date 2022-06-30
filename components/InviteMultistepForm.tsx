import { useEffect } from "react";
import { Button, CircularProgress } from "@mui/material";
import moment from "moment-timezone";
import { useInviteMultistepFormContext } from "../contexts/InviteMultistepFormContext";
import { InviteFragment } from "../graphql/generated/types";
import AdditionalOptions from "./form/AdditionalOptions";
import AvailableTimes from "./form/AvailableTimes";
import BasicInfo from "./form/BasicInfo";
import Done from "./form/Done";

interface InviteMultistepFormProps {
  initialInviteInfo?: InviteFragment;
}

const InviteMultistepForm = ({ initialInviteInfo }: InviteMultistepFormProps) => {
  const { step, setAction, inviteInfo, setInviteInfo, previousStep, nextStep, isDoingAction } =
    useInviteMultistepFormContext();

  useEffect(() => {
    if (initialInviteInfo) {
      const parsedIntervals: Array<Array<Array<number>>> = Array.from(Array(initialInviteInfo.dateRange), () => []);

      initialInviteInfo.intervals.forEach((interval: { at: string; duration: number }) => {
        const date = moment.tz(interval.at, initialInviteInfo.timezone);
        const index = Math.abs(date.clone().startOf("days").diff(moment().startOf("days"), "days"));

        if (index >= initialInviteInfo.dateRange) return;

        parsedIntervals[index].push([
          date.hour(),
          date.minute(),
          date.hour() + Math.floor(interval.duration / 60),
          (date.minute() + (interval.duration % 60)) % 60,
        ]);
      });

      setInviteInfo({ ...initialInviteInfo, intervals: parsedIntervals });
      setAction("update");
    }
  }, [initialInviteInfo]);

  return (
    <div className="mb-20">
      <main className="m-auto max-w-2xl p-4">
        {step === 0 ? <BasicInfo /> : step === 1 ? <AvailableTimes /> : step === 2 ? <AdditionalOptions /> : <Done />}
      </main>

      {step !== 3 && (
        <footer className="fixed bottom-0 z-10 w-full border-t bg-gray-900 p-2">
          <div className="m-auto flex max-w-2xl justify-end">
            {step !== 0 && (
              <Button onClick={previousStep} variant="text">
                Back
              </Button>
            )}

            <Button
              onClick={nextStep}
              disabled={(step === 0 && inviteInfo.name.length === 0) || isDoingAction}
              variant="text"
            >
              {step === 2 ? "Save" : "Next"}
              {isDoingAction && <CircularProgress size={20} className="mx-2" />}
            </Button>
          </div>
        </footer>
      )}
    </div>
  );
};

export default InviteMultistepForm;
