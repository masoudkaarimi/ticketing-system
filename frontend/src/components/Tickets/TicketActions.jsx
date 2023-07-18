import {
  Button,
  ButtonGroup,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";

/*const TicketActions = ({ label, actions, color = "primary" }) => {
  return (
    <>
      <Typography variant="body2" color={"grey"} sx={{ my: 2 }}>
        {label}
      </Typography>
      <ButtonGroup variant="text" fullWidth color={color}>
        {actions.map((action, index) => {
          return <Button key={index}>{action}</Button>;
        })}
      </ButtonGroup>
    </>
  );
};*/

const TicketActions = ({
  label,
  defaultAction,
  actions,
  color = "primary",
  onChange,
}) => {
  const [action, setAction] = useState(null);

  useMemo(() => {
    setAction(defaultAction?.id);
  }, [defaultAction]);

  const handleChange = (event, value) => {
    setAction(value);
    onChange(value);
  };

  return (
    <>
      <Typography variant="body2" color={"grey"} sx={{ mt: 2, mb: 1 }}>
        {label}
      </Typography>
      <ToggleButtonGroup
        color={color}
        value={action}
        onChange={handleChange}
        fullWidth
        exclusive
      >
        {actions.map((item, index) => (
          <ToggleButton
            key={index}
            value={item.id}
            disabled={action === item.id}
          >
            {item.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </>
  );
};
export default TicketActions;
