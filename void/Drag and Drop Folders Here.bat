@echo off
set "target=%~1"

:: Check if the input is a folder
if exist "%target%\" (
    for /r "%target%" %%F in (*) do (
        echo Processing: "%%F"
        node "%~dp0void.mjs" "%%F" >> "%~dp0_NEW.void"
    )
) else (
    echo Please drag a folder onto this script.
)


pause