import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import { BiCalendar, BiTrashAlt } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { useInviteMultistepFormContext } from "../../contexts/InviteMultistepFormContext";
import mergeIntervals from "../../utility/mergeIntervals";

const AvailableTimes = () => {
  const { now, inviteInfo, setInviteInfo, durationOptions, slotIncrementOptions, dateRangeOptions, timeOptions } =
    useInviteMultistepFormContext();
  const [intervals, setIntervals] = useState(
    JSON.parse(JSON.stringify(inviteInfo.intervals)) as Array<Array<Array<number>>>
  );
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(-1);
  const [open, setOpen] = useState(false);

  const handleOpen = (selectedDateIndex: number) => {
    setOpen(true);
    setSelectedDateIndex(selectedDateIndex);
    setIntervals(JSON.parse(JSON.stringify(inviteInfo.intervals)) as Array<Array<Array<number>>>);
  };

  const handleClose = (selectedDateIndex: number) => {
    setOpen(false);
    setSelectedDateIndex(selectedDateIndex);
  };

  const handleStartTimeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, intervalIndex: number) => {
      const newStartTime = JSON.parse(e.target.value) as Array<number>;
      const newIntervals = [...intervals];
      newIntervals[selectedDateIndex][intervalIndex][0] = newStartTime[0];
      newIntervals[selectedDateIndex][intervalIndex][1] = newStartTime[1];
      setIntervals(newIntervals);
    },
    [intervals, selectedDateIndex]
  );

  const handleEndTimeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, intervalIndex: number) => {
      const newEndTime = JSON.parse(e.target.value) as Array<number>;
      const newIntervals = [...intervals];
      newIntervals[selectedDateIndex][intervalIndex][2] = newEndTime[0];
      newIntervals[selectedDateIndex][intervalIndex][3] = newEndTime[1];
      setIntervals(newIntervals);
    },
    [intervals, selectedDateIndex]
  );

  const handleIntervalAdd = useCallback(() => {
    const newIntervals = [...intervals];
    newIntervals[selectedDateIndex].push([9, 0, 17, 0]);
    setIntervals(newIntervals);
  }, [intervals, selectedDateIndex]);

  const handleIntervalDelete = useCallback(
    (intervalIndex: number) => {
      const newIntervals = [...intervals];
      newIntervals[selectedDateIndex].splice(intervalIndex, 1);
      setIntervals(newIntervals);
    },
    [intervals, selectedDateIndex]
  );

  const handleIntervalsRemove = useCallback(() => {
    const newIntervals = [...intervals];
    newIntervals[selectedDateIndex] = [];
    setIntervals(newIntervals);
  }, [intervals, selectedDateIndex]);

  const handleIntervalsApply = useCallback(() => {
    setInviteInfo({ ...inviteInfo, intervals: mergeIntervals(intervals) });
    handleClose(-1);
  }, [inviteInfo, intervals]);

  useEffect(() => {
    setInviteInfo((prevInviteInfo) => {
      const inviteInfoClone = { ...prevInviteInfo };

      if (inviteInfoClone.intervals.length < inviteInfo.dateRange)
        inviteInfoClone.intervals.push(...Array(inviteInfo.dateRange - inviteInfoClone.intervals.length).fill([]));
      else inviteInfoClone.intervals.splice(inviteInfo.dateRange);

      return inviteInfoClone;
    });
  }, [inviteInfo.dateRange]);

  const handleTextFieldChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInviteInfo({ ...inviteInfo, [e.target.name]: e.target.value });
    },
    [inviteInfo]
  );

  return (
    <div className="flex flex-col space-y-4">
      <TextField
        select
        InputLabelProps={{ shrink: true }}
        value={inviteInfo.duration}
        onChange={handleTextFieldChange}
        variant="standard"
        label="Event duration"
        name="duration"
      >
        {durationOptions.map((duration) => {
          return (
            <MenuItem key={duration.label} value={duration.value}>
              {duration.label}
            </MenuItem>
          );
        })}
      </TextField>

      <TextField
        select
        InputLabelProps={{ shrink: true }}
        value={inviteInfo.slotIncrement}
        onChange={handleTextFieldChange}
        variant="standard"
        label="Time slot increment"
        name="slotIncrement"
      >
        {slotIncrementOptions.map((slotIncrement) => {
          return (
            <MenuItem key={slotIncrement.label} value={slotIncrement.value}>
              {slotIncrement.label}
            </MenuItem>
          );
        })}
      </TextField>

      <TextField
        select
        InputLabelProps={{ shrink: true }}
        value={inviteInfo.dateRange}
        onChange={handleTextFieldChange}
        variant="standard"
        label="Date range"
        name="dateRange"
      >
        {dateRangeOptions.map((dateRange) => {
          return (
            <MenuItem key={dateRange.label} value={dateRange.value}>
              {dateRange.label}
            </MenuItem>
          );
        })}
      </TextField>

      <List className="rounded-lg border p-0">
        {[...Array(inviteInfo.dateRange)].map((_, index) => {
          const currentDate = moment().add(index, "days").format("ddd, MMM DD");

          return (
            <ListItemButton key={index} onClick={() => handleOpen(index)}>
              <ListItemIcon className="hidden sm:flex">
                <BiCalendar
                  className={`${inviteInfo.intervals[index].length === 0 ? "fill-slate-400" : "fill-yellow-400"}`}
                  size={20}
                />
              </ListItemIcon>

              <ListItemText primary={currentDate} />

              <div className="flex items-center space-x-4">
                <div>
                  {inviteInfo.intervals[index].map((interval: Array<number>, intervalIndex: number) => {
                    const startTimeText = timeOptions.find(
                      (option) => option.value === JSON.stringify(interval.slice(0, 2))
                    )?.label;
                    const endTimeText = timeOptions.find(
                      (option) => option.value === JSON.stringify(interval.slice(2, 4))
                    )?.label;

                    return (
                      <Typography key={intervalIndex} className="text-sm sm:text-base">
                        {startTimeText} - {endTimeText}
                      </Typography>
                    );
                  })}
                </div>
                <IoIosArrowForward />
              </div>
            </ListItemButton>
          );
        })}

        <Modal open={open} onClose={() => handleClose(-1)}>
          <Box className="scrollbar absolute top-1/2 max-h-full w-full -translate-y-1/2 space-y-4 overflow-y-auto bg-gray-900 p-4 md:left-1/2 md:max-w-2xl md:-translate-x-1/2">
            <Typography variant="h5">
              Availability - {moment(now).add(selectedDateIndex, "days").format("ddd, MMM DD")}
            </Typography>

            {selectedDateIndex !== -1 && intervals[selectedDateIndex].length === 0 && (
              <Typography className="w-full select-none rounded-lg border border-gray-400 p-4 text-center text-gray-400">
                No availability on this day
              </Typography>
            )}

            {selectedDateIndex !== -1 &&
              intervals[selectedDateIndex].map((interval: Array<number>, index: number) => {
                const intervalDifference = 60 * (interval[2] - interval[0]) + (interval[3] - interval[1]);

                return (
                  <div key={index} className="space-y-1">
                    <div className="flex w-full items-center space-x-4">
                      <TextField
                        select
                        error={intervalDifference < inviteInfo.duration}
                        InputLabelProps={{ shrink: true }}
                        value={JSON.stringify(interval.slice(0, 2))}
                        onChange={(e) => handleStartTimeChange(e, index)}
                        variant="standard"
                        label="Start"
                        className="flex-grow"
                      >
                        {timeOptions.map((time) => {
                          return (
                            <MenuItem key={time.label} value={time.value}>
                              {time.label}
                            </MenuItem>
                          );
                        })}
                      </TextField>

                      <TextField
                        select
                        error={intervalDifference < inviteInfo.duration}
                        InputLabelProps={{ shrink: true }}
                        value={JSON.stringify(interval.slice(2, 4))}
                        onChange={(e) => handleEndTimeChange(e, index)}
                        variant="standard"
                        label="End"
                        className="flex-grow"
                      >
                        {timeOptions.map((time) => {
                          return (
                            <MenuItem key={time.label} value={time.value}>
                              {time.label}
                            </MenuItem>
                          );
                        })}
                      </TextField>

                      <IconButton onClick={() => handleIntervalDelete(index)}>
                        <BiTrashAlt size={20} />
                      </IconButton>
                    </div>

                    <Typography className="text-xs text-red-500">
                      {intervalDifference <= 0
                        ? "Start time must be before end time"
                        : intervalDifference < inviteInfo.duration
                        ? "Interval must be at least as long as event duration"
                        : ""}
                    </Typography>
                  </div>
                );
              })}

            <Button variant="outlined" onClick={handleIntervalAdd}>
              Add new interval
            </Button>
            <Button variant="outlined" onClick={handleIntervalsRemove}>
              Remove all
            </Button>
            <Button variant="contained" onClick={handleIntervalsApply}>
              Apply
            </Button>
          </Box>
        </Modal>
      </List>
    </div>
  );
};

/*

[
  [[],[],[]],
  [],
  []
]


*/

export default AvailableTimes;
