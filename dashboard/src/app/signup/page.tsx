'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Container,
  Box,
  Paper,
  Typography,
  ThemeProvider,
  createTheme,
  CssBaseline,
  IconButton
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import DynamicForm from '@/components/DynamicForm';
import formData from '@/data/formData.json';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366f1', // Indigo 500
      light: '#818cf8',
      dark: '#4f46e5',
    },
    secondary: {
      main: '#22d3ee', // Cyan 400
    },
    background: {
      default: '#020617',
      paper: 'rgba(15, 23, 42, 0.6)',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          marginTop: '8px',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          margin: '4px 8px',
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: 'rgba(99, 102, 241, 0.15)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(99, 102, 241, 0.25)',
            '&:hover': {
              backgroundColor: 'rgba(99, 102, 241, 0.35)',
            },
          },
        },
      },
    },
  },
});

export default function SignupPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (data: any) => {
    setLoading(true);
    console.log('Signup Form Data:', data);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Data Persistence
    const existingUsers = JSON.parse(localStorage.getItem('revest_users') || '[]');
    localStorage.setItem('revest_users', JSON.stringify([...existingUsers, data]));

    setLoading(false);
    setIsSubmitted(true);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          background: '#020617',
          padding: 2,
        }}
      >
        {/* Animated Background Blobs */}
        <Box
          component={motion.div}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          sx={{
            position: 'absolute',
            top: '-10%',
            left: '-10%',
            width: '40vw',
            height: '40vw',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            zIndex: 0,
          }}
        />
        <Box
          component={motion.div}
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -120, 0],
            x: [0, -60, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          sx={{
            position: 'absolute',
            bottom: '-10%',
            right: '-10%',
            width: '45vw',
            height: '45vw',
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            zIndex: 0,
          }}
        />

        <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <Box
                key="signup-form"
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    padding: { xs: 3, md: 5 },
                    borderRadius: '32px',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    background: 'rgba(15, 23, 42, 0.7)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  <Box sx={{ mb: 4, textAlign: 'center' }}>
                    <Typography
                      variant="h3"
                      component="h1"
                      gutterBottom
                      sx={{
                        fontWeight: 850,
                        background: 'linear-gradient(to right, #ffffff, #6366f1)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 1
                      }}
                    >
                      Create Account
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      Join the future of dynamic data visualization.
                    </Typography>
                  </Box>
                  {/* Sign Up Form */}
                  <DynamicForm
                    fields={formData.data as any}
                    onSubmit={handleSignup}
                    loading={loading}
                  />

                  <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Typography variant="body2" color="textSecondary" sx={{ opacity: 0.8 }}>
                      Already have an account?{' '}
                      <Link href="/" style={{ color: '#818cf8', fontWeight: 600, textDecoration: 'none' }}>
                        Sign In
                      </Link>
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            ) : (
              <Box
                key="success-state"
                component={motion.div}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                sx={{ textAlign: 'center' }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    padding: 6,
                    borderRadius: '32px',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    background: 'rgba(15, 23, 42, 0.7)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 3
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
                  >
                    <CheckCircle2 size={80} color="#22d3ee" strokeWidth={1.5} />
                  </motion.div>

                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                      Welcome Aboard!
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      Your account has been created successfully.
                    </Typography>
                  </Box>

                  <Link href="/" style={{ width: '100%' }}>
                    <Box
                      component="button"
                      sx={{
                        width: '100%',
                        padding: '16px',
                        borderRadius: '16px',
                        background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '1rem',
                        boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.3)',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 20px 25px -5px rgba(99, 102, 241, 0.4)',
                        }
                      }}
                    >
                      Go to Dashboard
                    </Box>
                  </Link>

                  <Box
                    component="button"
                    onClick={() => setIsSubmitted(false)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      color: 'text.secondary',
                      fontSize: '0.875rem',
                      '&:hover': { color: 'white' }
                    }}
                  >
                    <ArrowLeft size={16} />
                    Back to signup
                  </Box>
                </Paper>
              </Box>
            )}
          </AnimatePresence>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
