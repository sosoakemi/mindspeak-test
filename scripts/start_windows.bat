@echo off
REM Serve o frontend MindSpeak nesta maquina, acessivel pela rede local
REM (iPad na mesma WiFi). Rode setup_windows.bat antes, uma vez.
REM Deixe o backend (scripts\start_windows.bat do mindspeak-backend) rodando
REM em outra janela antes de abrir o app.
setlocal enabledelayedexpansion
cd /d "%~dp0\.."

if not exist "dist" (
  echo [ERRO] Build nao encontrado. Rode scripts\setup_windows.bat primeiro.
  pause
  exit /b 1
)

set IP=
for /f "tokens=2 delims=:" %%A in ('ipconfig ^| findstr /R /C:"IPv4"') do (
  if not defined IP set IP=%%A
)
set IP=%IP: =%
if not defined IP set IP=<verifique com "ipconfig">

echo.
echo ==============================================================
echo  Frontend do MindSpeak no ar.
echo.
echo  Abra no iPad (mesma rede WiFi do PC):
echo    http://%IP%:4173
echo.
echo  Se tiver mais de uma placa de rede (WiFi + Ethernet + VPN), o IP
echo  acima pode nao ser o certo — confira com "ipconfig" e pegue o da
echo  placa WiFi.
echo ==============================================================
echo.

call npm run preview -- --host
