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

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Container maxWidth="sm">
      <Box className="center-block">
        <Card variant="outlined">
          <CardContent component="form">
            <Typography variant="h5" component="h1">
              Login
            </Typography>

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

            <Button
                variant="contained"
                fullWidth
                size="large"
                type="submit"
                startIcon={<Person />}
                sx={{ marginTop: 1 }}
            >
              Login
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
    );
};

export default Login;
