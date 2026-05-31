import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppShell } from './layouts/AppShell'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/auth/LoginPage'
import { RegisterPage } from './pages/auth/RegisterPage'
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage'
import { PatientPage } from './pages/patient/PatientPage'
import { PatientLoginPage } from './pages/patient/PatientLoginPage'
import { PatientRegisterPage } from './pages/patient/PatientRegisterPage'
import { PatientDashboardLayout } from './pages/patient/PatientDashboardLayout'
import { PatientCommunicationPage } from './pages/patient/dashboard/PatientCommunicationPage'
import { PatientSignalsPage } from './pages/patient/dashboard/PatientSignalsPage'
import { PatientHistoryPage } from './pages/patient/dashboard/PatientHistoryPage'
import { PatientSupportPage } from './pages/patient/dashboard/PatientSupportPage'
import { PatientCommunicatePage } from './pages/patient/PatientCommunicatePage'
import { PatientPhrasesWorkspacePage } from './pages/patient/dashboard/PatientPhrasesWorkspacePage'
import { PatientSettingsPage } from './pages/patient/dashboard/PatientSettingsPage'
import { DashboardLayout } from './pages/dashboard/DashboardLayout'
import { DashboardOverviewPage } from './pages/dashboard/DashboardOverviewPage'
import { MonitorPage } from './pages/dashboard/MonitorPage'
import { HistoryPage } from './pages/dashboard/HistoryPage'
import { AlertsPage } from './pages/dashboard/AlertsPage'
import { SettingsPage } from './pages/dashboard/SettingsPage'
import { PhrasesPage } from './pages/dashboard/PhrasesPage'

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/cadastro', element: <RegisterPage /> },
      { path: '/forgot-password', element: <ForgotPasswordPage /> },
      { path: '/patient', element: <Navigate to="/patient/dashboard" replace /> },
      { path: '/patient/demo', element: <PatientPage /> },
      { path: '/patient/login', element: <PatientLoginPage /> },
      { path: '/patient/register', element: <PatientRegisterPage /> },
      { path: '/patient/communicate', element: <PatientCommunicatePage /> },
      { path: '/patient/bci', element: <Navigate to="/patient/communicate" replace /> },
      {
        path: '/patient/dashboard',
        element: <PatientDashboardLayout />,
        children: [
          { index: true, element: <PatientCommunicationPage /> },
          { path: 'comunicacao', element: <PatientCommunicationPage /> },
          { path: 'sinais', element: <PatientSignalsPage /> },
          { path: 'historico', element: <PatientHistoryPage /> },
          { path: 'suporte', element: <PatientSupportPage /> },
          { path: 'palavras', element: <PatientPhrasesWorkspacePage /> },
          { path: 'configuracoes', element: <PatientSettingsPage /> },
          { path: 'editor', element: <Navigate to="/patient/dashboard/palavras" replace /> },
          { path: 'adicionar', element: <Navigate to="/patient/dashboard/palavras" replace /> },
          { path: '*', element: <Navigate to="/patient/dashboard" replace /> },
        ],
      },
      {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
          { index: true, element: <DashboardOverviewPage /> },
          { path: 'monitor', element: <MonitorPage /> },
          { path: 'history', element: <HistoryPage /> },
          { path: 'alerts', element: <AlertsPage /> },
          { path: 'settings', element: <SettingsPage /> },
          { path: 'phrases', element: <PhrasesPage /> },
          { path: '*', element: <Navigate to="/dashboard" replace /> },
        ],
      },
    ],
  },
])
