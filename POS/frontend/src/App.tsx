// frontend/src/App.tsx

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import InventoryList from './components/InventoryList';
import ReportView from './components/ReportView';
import CustomerProfile from './components/CustomerProfile';
import { useAppDispatch, useAppSelector } from './hooks';
import { fetchCurrentUser } from './slices/authSlice';
import { CircularProgress, Box } from '@mui/material';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { token, user, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchCurrentUser());
    }
  }, [token, user, dispatch]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
        />
        <Route path="/login" element={token ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/transactions"
          element={token ? <TransactionForm /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/inventory"
          element={token ? <InventoryList /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/reports"
          element={token ? <ReportView /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/customers"
          element={token ? <CustomerProfile /> : <Navigate to="/login" replace />}
        />
        {/* Add more routes as needed */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
