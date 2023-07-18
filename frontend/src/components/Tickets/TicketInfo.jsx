import {
  Card,
  CardContent,
  Divider,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  retrieveTicketApi,
  ticketActionApi,
} from "../../features/services/TicketService";
import { formatDate } from "../../features/utils";
import TicketActions from "./TicketActions.jsx";

const TicketInfo = ({ fetcher }) => {
  const data = fetcher?.data?.results;

  const queryClient = useQueryClient();

  const ticketMutateAction = useMutation({
    mutationKey: ["tickets", `${data?.id}`],
    mutationFn: (id, type, value) => ticketActionApi(id, type, value),
    onSuccess: (newData, fdata) => {
      queryClient.setQueryData(["tickets", `${fdata?.id}`], (oldData) => {
        return newData?.results;
      });

      let message = fdata?.type === "status" ? "وضعیت" : fdata?.type === "priority" ? "الویت" : "";
      toast.success(`با موفقیت ${message} تغییر یافت.`, { id: "ticket-action-success" });
    },
    onError: (error) => {
      toast.error(error.toString(), { id: "ticket-action-error" });
    },
  });

  return (
    <>
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            fontWeight="500"
            sx={{ mb: 2 }}
          >
            Ticket Info
          </Typography>
          <Divider />

          {!fetcher.isLoading ? (
            <Grid container rowSpacing={4} columnSpacing={1} sx={{ my: 0.3 }}>
              <Grid item xs={4}>
                <Typography variant="subtitle1" fontWeight="500">
                  NO
                </Typography>
                <Typography variant="body2">{data?.id}</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle1" fontWeight="500">
                  Subject
                </Typography>
                <Typography variant="body2">{data?.title}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1" fontWeight="500">
                  Status
                </Typography>
                <Typography variant="body2">{data?.status}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1" fontWeight="500">
                  Priority
                </Typography>
                <Typography variant="body2">{data?.priority?.name}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1" fontWeight="500">
                  Category
                </Typography>
                <Typography variant="body2">{data?.category?.name}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="500">
                  Last Update
                </Typography>
                <Typography variant="body2">
                  {formatDate(data?.update_at)}
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <Grid container rowSpacing={4} columnSpacing={1} sx={{ my: 0.3 }}>
              <Grid item xs={4}>
                <Typography variant="subtitle1" fontWeight="500">
                  NO
                </Typography>
                <Skeleton variant={"text"} animation={"wave"} height={40} />
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle1" fontWeight="500">
                  Subject
                </Typography>
                <Skeleton variant={"text"} animation={"wave"} height={40} />
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1" fontWeight="500">
                  Status
                </Typography>
                <Skeleton variant={"text"} animation={"wave"} height={40} />
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1" fontWeight="500">
                  Priority
                </Typography>
                <Skeleton variant={"text"} animation={"wave"} height={40} />
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1" fontWeight="500">
                  Category
                </Typography>
                <Skeleton variant={"text"} animation={"wave"} height={40} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="500">
                  Last Update
                </Typography>
                <Skeleton variant={"text"} animation={"wave"} height={40} />
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            fontWeight="500"
            sx={{ mb: 2 }}
          >
            Actions
          </Typography>
          <Divider />
          <TicketActions
            label={"Change status"}
            color={"primary"}
            defaultAction={{
              id: data?.status?.toUpperCase(),
              name: data?.status,
            }}
            actions={[
              { id: "ANSWERED", name: "Answered" },
              { id: "PENDING", name: "Pending" },
              { id: "CLOSED", name: "Closed" },
            ]}
            onChange={(value) =>
              ticketMutateAction.mutate(data?.id, "status", value)
            }
          />
          <TicketActions
            label={"Change Priority"}
            color={"secondary"}
            defaultAction={{
              id: data?.priority?.id,
              name: data?.priority?.name,
            }}
            actions={[
              { id: 3, name: "High" },
              { id: 2, name: "Medium" },
              { id: 1, name: "Low" },
            ]}
            onChange={(value) => {
              ticketMutateAction.mutate(data?.id, "priority", value);
            }}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default TicketInfo;
