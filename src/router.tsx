import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppShell } from './layouts/AppShell'
import { SiteScope } from './site/SiteScope'

// As páginas entram por `lazy` em vez de import direto: cada rota vira um
// chunk próprio e o primeiro acesso deixa de baixar o app inteiro (o bundle
// único passava de 1,1 MB, acima do limite de aviso do Vite). Só os dois
// shells acima ficam no bundle inicial, porque todo caminho passa por eles.
// Os layouts de dashboard também são lazy: quem só visita o site nunca
// carrega os portais.
export const router = createBrowserRouter([
  {
    element: <SiteScope />,
    children: [
      { path: '/', lazy: async () => ({ Component: (await import('./site/pages/HomePage')).default }) },
      { path: '/produto', lazy: async () => ({ Component: (await import('./site/pages/ProductPage')).default }) },
      {
        path: '/instrucoes',
        lazy: async () => ({ Component: (await import('./site/pages/InstructionsPage')).default }),
      },
      { path: '/equipe', lazy: async () => ({ Component: (await import('./site/pages/TeamPage')).default }) },
      {
        path: '/referencias',
        lazy: async () => ({ Component: (await import('./site/pages/ReferencesPage')).default }),
      },
      { path: '/jogo', lazy: async () => ({ Component: (await import('./site/pages/GamePage')).default }) },
    ],
  },
  {
    element: <AppShell />,
    children: [
      {
        path: '/acesso',
        lazy: async () => ({
          Component: (await import('./pages/access/AccessSelectionPage')).AccessSelectionPage,
        }),
      },
      {
        path: '/familiar/login',
        lazy: async () => ({ Component: (await import('./pages/auth/LoginPage')).LoginPage }),
      },
      {
        path: '/familiar/cadastro',
        lazy: async () => ({ Component: (await import('./pages/auth/RegisterPage')).RegisterPage }),
      },
      {
        path: '/familiar/forgot-password',
        lazy: async () => ({
          Component: (await import('./pages/auth/ForgotPasswordPage')).ForgotPasswordPage,
        }),
      },
      {
        path: '/clinico/login',
        lazy: async () => ({
          Component: (await import('./pages/auth/clinical/ClinicalLoginPage')).ClinicalLoginPage,
        }),
      },
      {
        path: '/clinico/cadastro',
        lazy: async () => ({
          Component: (await import('./pages/auth/clinical/ClinicalRegisterPage')).ClinicalRegisterPage,
        }),
      },
      {
        path: '/clinico/forgot-password',
        lazy: async () => ({
          Component: (await import('./pages/auth/clinical/ClinicalForgotPasswordPage'))
            .ClinicalForgotPasswordPage,
        }),
      },
      { path: '/login', element: <Navigate to="/familiar/login" replace /> },
      { path: '/cadastro', element: <Navigate to="/familiar/cadastro" replace /> },
      { path: '/forgot-password', element: <Navigate to="/familiar/forgot-password" replace /> },
      { path: '/patient', element: <Navigate to="/patient/dashboard" replace /> },
      {
        path: '/patient/demo',
        lazy: async () => ({ Component: (await import('./pages/patient/PatientPage')).PatientPage }),
      },
      { path: '/patient/login', element: <Navigate to="/familiar/login" replace /> },
      { path: '/patient/register', element: <Navigate to="/familiar/cadastro" replace /> },
      {
        path: '/patient/communicate',
        lazy: async () => ({
          Component: (await import('./pages/patient/PatientCommunicatePage')).PatientCommunicatePage,
        }),
      },
      { path: '/patient/bci', element: <Navigate to="/patient/communicate" replace /> },
      {
        path: '/patient/dashboard',
        lazy: async () => ({
          Component: (await import('./pages/patient/PatientDashboardLayout')).PatientDashboardLayout,
        }),
        children: [
          {
            index: true,
            lazy: async () => ({
              Component: (await import('./pages/patient/dashboard/PatientCommunicationPage'))
                .PatientCommunicationPage,
            }),
          },
          {
            path: 'comunicacao',
            lazy: async () => ({
              Component: (await import('./pages/patient/dashboard/PatientCommunicationPage'))
                .PatientCommunicationPage,
            }),
          },
          {
            path: 'sinais',
            lazy: async () => ({
              Component: (await import('./pages/patient/dashboard/PatientSignalsPage')).PatientSignalsPage,
            }),
          },
          {
            path: 'historico',
            lazy: async () => ({
              Component: (await import('./pages/patient/dashboard/PatientHistoryPage')).PatientHistoryPage,
            }),
          },
          {
            path: 'suporte',
            lazy: async () => ({
              Component: (await import('./pages/patient/dashboard/PatientSupportPage')).PatientSupportPage,
            }),
          },
          {
            path: 'palavras',
            lazy: async () => ({
              Component: (await import('./pages/patient/dashboard/PatientPhrasesWorkspacePage'))
                .PatientPhrasesWorkspacePage,
            }),
          },
          {
            path: 'configuracoes',
            lazy: async () => ({
              Component: (await import('./pages/patient/dashboard/PatientSettingsPage')).PatientSettingsPage,
            }),
          },
          { path: 'editor', element: <Navigate to="/patient/dashboard/palavras" replace /> },
          { path: 'adicionar', element: <Navigate to="/patient/dashboard/palavras" replace /> },
          { path: '*', element: <Navigate to="/patient/dashboard" replace /> },
        ],
      },
      {
        path: '/dashboard',
        lazy: async () => ({
          Component: (await import('./pages/dashboard/DashboardLayout')).DashboardLayout,
        }),
        children: [
          {
            index: true,
            lazy: async () => ({
              Component: (await import('./pages/dashboard/DashboardOverviewPage')).DashboardOverviewPage,
            }),
          },
          {
            path: 'patients',
            lazy: async () => ({ Component: (await import('./pages/dashboard/PatientsPage')).PatientsPage }),
          },
          {
            path: 'monitor',
            lazy: async () => ({ Component: (await import('./pages/dashboard/MonitorPage')).MonitorPage }),
          },
          {
            path: 'history',
            lazy: async () => ({ Component: (await import('./pages/dashboard/HistoryPage')).HistoryPage }),
          },
          {
            path: 'alerts',
            lazy: async () => ({ Component: (await import('./pages/dashboard/AlertsPage')).AlertsPage }),
          },
          {
            path: 'settings',
            lazy: async () => ({ Component: (await import('./pages/dashboard/SettingsPage')).SettingsPage }),
          },
          {
            path: 'phrases',
            lazy: async () => ({ Component: (await import('./pages/dashboard/PhrasesPage')).PhrasesPage }),
          },
          { path: '*', element: <Navigate to="/dashboard" replace /> },
        ],
      },
    ],
  },
])
