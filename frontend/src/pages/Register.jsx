import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { Person } from "@mui/icons-material";

const Register = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        confirm_password: "",
    });
    const [emailIsNotValid, setEmailIsNotValid] = useState(false);

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.name === "email") {
            /*if (e.target.checkValidity()) {
              setEmailIsNotValid(false);
              e.target.setCustomValidity("");
            } else {
              setEmailIsNotValid(true);
              e.target.setCustomValidity("Please enter a valid username.");
            }*/
        }
    };

    return (
        <Container maxWidth={"md"}>
      <Box className="center-block">
        <Card variant="outlined">
          <CardContent component="form">
            <Typography variant="h5" component="h1">Register</Typography>
            <Box
                sx={{
                    display: "flex",
                    gap: { xs: 0, md: 3 },
                    flexWrap: { xs: "wrap", md: "nowrap" },
                }}
            >
              <TextField
                  type="text"
                  name="first_name"
                  variant="standard"
                  label="First Name"
                  size="small"
                  margin="normal"
                  fullWidth
                  required
                  value={formData.first_name}
                  onChange={handleOnChange}
              />
              <TextField
                  type="text"
                  name="last_name"
                  variant="standard"
                  label="Last Name"
                  size="small"
                  margin="normal"
                  fullWidth
                  required
                  value={formData.last_name}
                  onChange={handleOnChange}
              />
            </Box>

            <TextField
                type="text"
                name="username"
                variant="standard"
                label="Username"
                size="small"
                margin="normal"
                fullWidth
                required
                value={formData.username}
                onChange={handleOnChange}
            />
            <TextField
                type="email"
                name="email"
                variant="standard"
                label="Email"
                size="small"
                margin="normal"
                fullWidth
                required
                error={emailIsNotValid}
                inputProps={{
                    pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
                }}
                value={formData.email}
                onChange={handleOnChange}
            />
            <Box
                sx={{
                    display: "flex",
                    gap: { xs: 0, md: 3 },
                    flexWrap: { xs: "wrap", md: "nowrap" },
                }}
            >
              <TextField
                  type="password"
                  name="password"
                  variant="standard"
                  label="Password"
                  size="small"
                  margin="normal"
                  fullWidth
                  required
                  error={
                      formData.password.length < 8 && formData.password.length !== 0
                  }
                  value={formData.password}
                  onChange={handleOnChange}
              />
              <TextField
                  type="password"
                  name="confirm_password"
                  variant="standard"
                  label="Confirm Password"
                  size="small"
                  margin="normal"
                  fullWidth
                  required
                  error={
                      (formData.confirm_password.length < 8 &&
                          formData.confirm_password.length !== 0) ||
                      formData.confirm_password !== formData.password
                  }
                  value={formData.confirm_password}
                  onChange={handleOnChange}
              />
            </Box>

            <Button
                variant="contained"
                fullWidth
                size="large"
                type="submit"
                startIcon={<Person />}
                sx={{ marginTop: 1 }}
            >
              Register
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
    );
};

export default Register;
