import { AttachmentRounded, SendRounded } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Input,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useMemo, useState } from "react";
import { newTicketApi } from "../../features/services/TicketService";

const TicketReply = ({ data }) => {
  const [attachment, setAttachment] = useState(null);
  const [formData, setFormData] = useState({
    parent: null,
    title: null,
    category: null,
    priority: null,
    message: "",
  });

  const attachmentRef = useRef();
  const queryClient = useQueryClient();

  const ticketMutation = useMutation({
    mutationFn: (newTicket) => newTicketApi(newTicket),
    onSuccess: (newData, fdata) => {
      queryClient.setQueryData(["tickets", `${fdata?.parent}`], (oldData) => {
        const prepData = JSON.parse(JSON.stringify(oldData));
        prepData?.results?.children.push(newData.results);
        return prepData;
      });
    },
  });

  const handleAttachment = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = new FileReader();
      file.onload = (e) => {
        setAttachment(e.target.result);
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    ticketMutation.mutate({ ...formData, attachment: attachment });
    setFormData({ ...formData, message: "" });
  };

  useMemo(
    () =>
      setFormData({
        parent: data?.id,
        title: data?.title,
        category: null,
        priority: data?.priority?.id,
        message: null,
      }),
    [data]
  );

  return (
    <Box
      sx={{ p: 2, mt: 2, mx: "auto", borderRadius: 2 }}
      component={"form"}
      onSubmit={handleSubmit}
    >
      <TextField
        id="ticket_reply"
        variant="standard"
        label="Your Message"
        multiline
        fullWidth
        rows={4}
        value={formData?.message || ""}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                color="inherit"
                onClick={() => attachmentRef.current.click()}
              >
                <AttachmentRounded fontSize="large" />
                <input
                  type={"file"}
                  style={{ display: "none" }}
                  ref={attachmentRef}
                  onChange={handleAttachment}
                />
              </IconButton>
              <IconButton color="primary" type={"submit"}>
                <SendRounded fontSize="large" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default TicketReply;
