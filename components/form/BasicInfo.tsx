import { ChangeEvent, useCallback } from "react";
import { MenuItem, TextField } from "@mui/material";
import { useInviteMultistepFormContext } from "../../contexts/InviteMultistepFormContext";

const BasicInfo = () => {
  const { inviteInfo, setInviteInfo, locationOptions } = useInviteMultistepFormContext();

  const handleTextFieldChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInviteInfo({ ...inviteInfo, [e.target.name]: e.target.value });
    },
    [inviteInfo]
  );

  return (
    <div className="flex flex-col space-y-4">
      <TextField
        required
        error={inviteInfo.name.length === 0}
        InputLabelProps={{ shrink: true }}
        value={inviteInfo.name}
        onChange={handleTextFieldChange}
        autoComplete="off"
        variant="standard"
        label="Name"
        helperText="Required"
        name="name"
      />

      <TextField
        select
        InputLabelProps={{ shrink: true }}
        value={inviteInfo.location}
        onChange={handleTextFieldChange}
        variant="standard"
        label="Location"
        name="location"
      >
        {locationOptions.map((location) => {
          return (
            <MenuItem key={location.label} value={location.value}>
              {location.label}
            </MenuItem>
          );
        })}
      </TextField>

      <TextField
        InputLabelProps={{ shrink: true }}
        value={inviteInfo.description}
        onChange={handleTextFieldChange}
        autoComplete="off"
        variant="standard"
        label="Description"
        name="description"
        placeholder="Scheduling instructions, information about the meeting, etc."
      />
    </div>
  );
};

export default BasicInfo;
