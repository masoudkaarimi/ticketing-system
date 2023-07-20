import { AttachmentRounded, SendRounded } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addTicketApi,
  retrieveTicketCategoriesApi,
  retrieveTicketPrioritiesApi,
} from "../features/services/TicketService";

const AddTicket = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    priority: "",
    message: "",
  });
  const [attachment, setAttachment] = useState(null);
  const attachmentRef = useRef();

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  /*const prepData = JSON.parse(JSON.stringify(oldData));
                prepData?.results?.children.push(newData.results);
                return prepData;*/
  const ticketMutation = useMutation({
    mutationFn: (newTicket) => addTicketApi(newTicket),
    onSuccess: (newData, fdata) => {
      queryClient.setQueryData(["tickets", `${fdata?.parent}`], (oldData) =>
        oldData
          ? {
              ...oldData,
              children: [...newData.results?.children],
            }
          : oldData
      );
    },
  });

  const ticketCategoriesQuery = useQuery({
    queryKey: ["tickets", "categories"],
    queryFn: () => retrieveTicketCategoriesApi(),
    refetchOnWindowFocus: false,
  });

  const ticketPrioritiesQuery = useQuery({
    queryKey: ["tickets", "priorities"],
    queryFn: () => retrieveTicketPrioritiesApi(),
    refetchOnWindowFocus: false,
  });

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAttachment = (event) => {
    if (event.target.files && event.target.files[0]) {
      setAttachment(event.target.files[0]);
    }
  };

  async function handleOnSubmit(e) {
    e.preventDefault();
    ticketMutation.mutate({ ...formData, attachment: attachment });

    setFormData({
      ...formData,
      title: "",
      category: "",
      priority: "",
      message: "",
    });
    setAttachment(null);
    navigate("/");

    /*if (result?.success) {
                      toast.success("Your Message sent", {
                        id: "add-ticket-success",
                      });
                    } else {
                      toast.error(result?.error, { id: "add-ticket-error" });
                    }*/
  }

  return (
    <Container maxWidth={"xl"}>
      <Box className="center-block">
        <Card variant="outlined" sx={{ width: "50%" }}>
          <CardContent component="form" onSubmit={handleOnSubmit}>
            <Typography
              variant="h5"
              component="h1"
              textAlign={"center"}
              gutterBottom
            >
              Add New Ticket
            </Typography>
            <Divider />
            <TextField
              type="text"
              name="title"
              variant="standard"
              label="Title"
              size="small"
              margin="normal"
              fullWidth
              required
              value={formData.title}
              onChange={handleOnChange}
            />
            <Box
              sx={{
                display: "flex",
                gap: { xs: 0, md: 3 },
                flexWrap: { xs: "wrap", md: "nowrap" },
                my: 2,
              }}
            >
              <FormControl variant="standard" fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleOnChange}
                  label="Category"
                >
                  {ticketCategoriesQuery?.data?.map((category, index) => (
                    <MenuItem key={index} value={category?.id}>
                      {category?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="standard" fullWidth>
                <InputLabel id="priority-label">Priority</InputLabel>
                <Select
                  labelId="priority-label"
                  id="priority"
                  name="priority"
                  required
                  value={formData.priority}
                  onChange={handleOnChange}
                  label="Priority"
                >
                  {ticketPrioritiesQuery?.data?.map((priority, index) => (
                    <MenuItem key={index} value={priority?.id}>
                      {priority?.name?.toLowerCase()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <TextField
              id="ticket_add"
              variant="standard"
              label="Message"
              multiline
              fullWidth
              required
              rows={4}
              value={formData?.message || ""}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
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
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};
export default AddTicket;
