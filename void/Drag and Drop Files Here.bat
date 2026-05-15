@echo off
setlocal enabledelayedexpansion

:: Check if at least one file was dropped
if "%~1"=="" (
    echo Please drag and drop files onto this batch script.
    pause
    exit /b
)

:: Loop through all dropped files and pass them to Node
for %%i in (%*) do (
    echo Processing: "%%~i"
    node "%~dp0void.mjs" "%%~i" >> "%~dp0_NEW.void"
)

pause