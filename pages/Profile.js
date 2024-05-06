import { Avatar, Box, Button, Chip, Container, Divider, Grid, Typography } from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";
import { styled } from "@mui/system";
import styles from '@/styles/profile.module.css'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function Profile() {
    const router = useRouter();
    const email = router.query.email;

    const [data, setData] = useState({
        name: "",
        profileImage: "",
        subscription_status: "",
        showsWatched: []
    });

    useEffect(() => {
        const userEmail = email || localStorage.getItem("email");

        const fetchProfile = async () => {
          try {
            const response = await fetch(`/api/getProfile?email=${userEmail}`);
            const results = await response.json();
            setData({
                name: results[0].name,
                profileImage: results[0].image,
                role: results[0].subscription_status,
                showsWatched: results.map(result => ({
                    title: result.title,
                    icon: result.image
                }))
            });
          } catch (error) {
            console.error("Failed to fetch shows:", error);
          }
        };

        fetchProfile();
      }, []);

    return (
        <Container maxWidth="md">
            <Box display="flex" alignItems="center" mt={4} mb={2}>
                <Avatar src={data.profileImage} sx={{ width: 80, height: 80 }} />
                <Box ml={2}>
                    <div className={styles.name}>{data.name}</div>
                    <div className={styles.subscription}>{data.role}</div>
                </Box>
            </Box>

            <Divider className={styles.divider} />

            <Box my={2}>
                <Typography className={styles.showheader}>Jump back into...</Typography>
                <Grid container spacing={2} mt={1}>
                    {data.showsWatched.map((show, index) => (
                        <Grid item xs={6} key={index}>
                            <Chip
                                label={`${show.icon} ${show.title}`}
                                variant="outlined"
                                sx={{ width: "100%", textAlign: "left" }}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Divider className={styles.divider} />

            <Box my={2}>
                <h1 className={styles.title}>Settings</h1>
                      
                <Button className={styles.options} >Change Password</Button>                      
                <Button className={styles.options} >Change Email</Button>                                        
                <Button className={styles.options} >Manage Subscription</Button>                                 
                <Button className={styles.options} >Delete Account</Button>  
                 
            </Box>
        </Container>
    );
};

export default Profile;
