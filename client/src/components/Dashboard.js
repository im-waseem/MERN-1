import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './ContextProvider/Context';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Dashboard = () => {
    const { logindata, setLoginData } = useContext(LoginContext);
    const [data, setData] = useState(false);

    const history = useNavigate();

    const DashboardValid = async () => {
        let token = localStorage.getItem("usersdatatoken");

        try {
            const res = await fetch("/validuser", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            });

            const data = await res.json();

            if (data.status === 401 || !data) {
                history("*");
            } else {
                console.log("user verified");
                setLoginData(data);
                history("/dash");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            // Handle the error (e.g., show a message to the user)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await DashboardValid();
            setData(true);
        };

        fetchData();
    }, [DashboardValid]);

    return (
        <>
            {data ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img src="./man.png" style={{ width: "200px", marginTop: 20 }} alt="" />
                    <h1>User Email: {logindata ? logindata.ValidUserOne.email : ""}</h1>
                </div>
            ) : (
                <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
                    Loading... &nbsp;
                    <CircularProgress />
                </Box>
            )}
        </>
    );
}

export default Dashboard;
