import React from 'react';
import EmployeeForm from './components/EmployeeForm';
import Dashboard from './components/Dashboard';

export default function App() {
  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>Employee Onboarding System</h1>
      <EmployeeForm />
      <hr />
      <Dashboard />
    </div>
  );
}
