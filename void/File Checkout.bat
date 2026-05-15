@echo off

copy nul "%~dp0_CHECKOUT.void"
node "%~dp0void_checkout.mjs" >> "%~dp0_CHECKOUT.void"

@REM pause