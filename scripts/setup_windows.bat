@echo off
REM Setup do frontend MindSpeak num computador Windows novo.
REM Rode uma vez só por computador.
setlocal
cd /d "%~dp0\.."

where node >nul 2>nul
if errorlevel 1 (
  echo [ERRO] Node.js nao encontrado no PATH. Instale Node 22+ (nodejs.org).
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo Instalando dependencias do frontend (pode demorar na 1a vez)...
  call npm install
  if errorlevel 1 goto :erro
)

echo Gerando build de producao...
call npm run build
if errorlevel 1 goto :erro

echo.
echo ==============================================================
echo  Setup do frontend concluido!
echo  Use scripts\start_windows.bat para servir o app na rede local.
echo ==============================================================
echo.
pause
exit /b 0

:erro
echo.
echo [ERRO] Falha no setup do frontend.
pause
exit /b 1
