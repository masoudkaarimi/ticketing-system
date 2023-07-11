import { AttachmentRounded, SendRounded } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { newTicketApi } from "../../features/services/TicketService";

const TicketReply = ({data}) => {
    const [formData, setFormData] = useState({
        parent  : null,
        title   : null,
        category: null,
        priority: null,
        message : ""
    });

    const queryClient = new QueryClient();

    const ticketMutation = useMutation({
        mutationFn: (newTicket) => newTicketApi(newTicket),
        onMutate  : async (newTicket) => {
            console.log(data?.id, "ID");
            console.log(newTicket, "newTicket");

            await queryClient.cancelQueries({ queryKey: ['tickets', data?.id] })

            const previousTickets = queryClient.getQueryData(['tickets', data?.id])
            queryClient.setQueryData(['tickets', data?.id], newTicket)
            return { previousTickets, newTicket: newTicket }

        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        ticketMutation.mutate(formData);
        setFormData({...formData, message: ""});
    };

    useMemo(() => setFormData({
        parent  : data?.id,
        title   : data?.title,
        category: null,
        priority: data?.priority?.id,
        message : null
    }), [data]);

    return (<Box sx={{p: 2, mt: 2, mx: "auto", borderRadius: 2}} component={"form"} onSubmit={handleSubmit}>
			<TextField
                id="ticket_reply"
                variant="standard"
                label="Your Message"
                multiline
                fullWidth
                rows={4}
                value={formData?.message || ""}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                size="small"
                InputProps={{
                    endAdornment: (<InputAdornment position="end">
							<IconButton color="inherit">
								<AttachmentRounded fontSize="large" />
							</IconButton>
							<IconButton color="primary" type={"submit"}>
								<SendRounded fontSize="large" />
							</IconButton>
						</InputAdornment>)
                }}
            />
		</Box>);
};

export default TicketReply;
