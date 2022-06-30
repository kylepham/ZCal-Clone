import { ChangeEvent, useCallback, useMemo } from "react";
import { MenuItem, TextField } from "@mui/material";
import { useInviteMultistepFormContext } from "../../contexts/InviteMultistepFormContext";
import { DisplayedTimezone } from "../../graphql/generated/types";

const AdditionalOptions = () => {
  const { inviteInfo, setInviteInfo, minimumNoticeOptions, displayedTimezoneOptions } = useInviteMultistepFormContext();

  const handleTextFieldChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInviteInfo({ ...inviteInfo, [e.target.name]: e.target.value });
    },
    [inviteInfo]
  );

  return (
    <div className="flex w-full flex-col space-y-4">
      <TextField
        select
        InputLabelProps={{ shrink: true }}
        value={inviteInfo.minimumNotice}
        onChange={handleTextFieldChange}
        variant="standard"
        label="Minimum notice"
        name="minimumNotice"
      >
        {minimumNoticeOptions.map((minimumNotice) => {
          return (
            <MenuItem key={minimumNotice.label} value={minimumNotice.value}>
              {minimumNotice.label}
            </MenuItem>
          );
        })}
      </TextField>

      <TextField
        select
        InputLabelProps={{ shrink: true }}
        value={inviteInfo.displayedTimezone}
        onChange={handleTextFieldChange}
        variant="standard"
        label="Displayed timezone"
        name="displayedTimezone"
      >
        {displayedTimezoneOptions.map((displayedTimezone) => {
          return (
            <MenuItem key={displayedTimezone.label} value={displayedTimezone.value}>
              {displayedTimezone.label}
            </MenuItem>
          );
        })}
      </TextField>
    </div>
  );
};

export default AdditionalOptions;
