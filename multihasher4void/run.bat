@echo off
for %%i in (%*) do (
  node "%~dp0index.mjs" "%%~i" >> "%~dp0_NEW.void"
)
pause