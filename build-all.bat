@echo off
rem Builds every package in dependency order: libraries first, demo last.
rem Usage: build-all.bat  (run from any directory; uses the bat location as root)
rem Requires dev dependencies to be installed (npm install inside each package/demo).
setlocal EnableExtensions

set "ROOT=%~dp0"
set "FAILED=0"

for %%P in (app-shell form-editor table-editor auth) do (
  echo.
  echo ===== Building %%P =====
  call npm run build --prefix "%ROOT%packages\%%P"
  if errorlevel 1 (
    echo [ERROR] Build failed for %%P
    set "FAILED=1"
    goto :end
  )
)

echo.
echo ===== Building demo =====
call npm run build --prefix "%ROOT%demo"
if errorlevel 1 (
  echo [ERROR] Build failed for demo
  set "FAILED=1"
  goto :end
)

:end
echo.
if "%FAILED%"=="1" (
  echo BUILD FAILED
  exit /b 1
) else (
  echo ALL BUILDS SUCCEEDED
  exit /b 0
)
