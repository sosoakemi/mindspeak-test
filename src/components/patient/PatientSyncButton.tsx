import { CheckCircle2, Wifi, WifiOff } from 'lucide-react'
import { cn } from '../../lib/cn'
import { Button } from '../shared/Button'
import { usePatientSync } from '../../hooks/usePatientSync'

type PatientSyncButtonProps = {
  fullWidth?: boolean
  className?: string
}

export function PatientSyncButton({ fullWidth = true, className }: PatientSyncButtonProps) {
  const { sync, isSyncing, status, errorMessage, sensorConnected } = usePatientSync()

  return (
    <div className={cn('space-y-2', className)}>
      <Button
        type="button"
        variant="primary"
        fullWidth={fullWidth}
        isLoading={isSyncing}
        icon={
          status === 'success' ? (
            <CheckCircle2 className="h-4 w-4" aria-hidden />
          ) : sensorConnected ? (
            <Wifi className="h-4 w-4" aria-hidden />
          ) : (
            <WifiOff className="h-4 w-4" aria-hidden />
          )
        }
        onClick={() => void sync()}
        aria-describedby={errorMessage ? 'sync-error' : undefined}
      >
        {isSyncing ? 'Sincronizando…' : status === 'success' ? 'Sincronizado' : 'Sincronizar'}
      </Button>
      {errorMessage ? (
        <p id="sync-error" className="text-xs text-red-600 dark:text-red-400" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </div>
  )
}
