import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppShell } from './layouts/AppShell'
import { AccessSelectionPage } from './pages/access/AccessSelectionPage'
import { SiteScope } from './site/SiteScope'
import HomePage from './site/pages/HomePage'
import ProductPage from './site/pages/ProductPage'
import InstructionsPage from './site/pages/InstructionsPage'
import TeamPage from './site/pages/TeamPage'
import ReferencesPage from './site/pages/ReferencesPage'
import GamePage from './site/pages/GamePage'
import { LoginPage } from './pages/auth/LoginPage'
import { RegisterPage } from './pages/auth/RegisterPage'
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage'
import { ClinicalLoginPage } from './pages/auth/clinical/ClinicalLoginPage'
import { ClinicalRegisterPage } from './pages/auth/clinical/ClinicalRegisterPage'
import { ClinicalForgotPasswordPage } from './pages/auth/clinical/ClinicalForgotPasswordPage'
import { PatientPage } from './pages/patient/PatientPage'
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
    element: <SiteScope />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/produto', element: <ProductPage /> },
      { path: '/instrucoes', element: <InstructionsPage /> },
      { path: '/equipe', element: <TeamPage /> },
      { path: '/referencias', element: <ReferencesPage /> },
      { path: '/jogo', element: <GamePage /> },
    ],
  },
  {
    element: <AppShell />,
    children: [
      { path: '/acesso', element: <AccessSelectionPage /> },
      { path: '/familiar/login', element: <LoginPage /> },
      { path: '/familiar/cadastro', element: <RegisterPage /> },
      { path: '/familiar/forgot-password', element: <ForgotPasswordPage /> },
      { path: '/clinico/login', element: <ClinicalLoginPage /> },
      { path: '/clinico/cadastro', element: <ClinicalRegisterPage /> },
      { path: '/clinico/forgot-password', element: <ClinicalForgotPasswordPage /> },
      { path: '/login', element: <Navigate to="/familiar/login" replace /> },
      { path: '/cadastro', element: <Navigate to="/familiar/cadastro" replace /> },
      { path: '/forgot-password', element: <Navigate to="/familiar/forgot-password" replace /> },
      { path: '/patient', element: <Navigate to="/patient/dashboard" replace /> },
      { path: '/patient/demo', element: <PatientPage /> },
      { path: '/patient/login', element: <Navigate to="/familiar/login" replace /> },
      { path: '/patient/register', element: <Navigate to="/familiar/cadastro" replace /> },
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
