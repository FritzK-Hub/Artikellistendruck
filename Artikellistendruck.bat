@echo off
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0HelperScript.ps1" %1 %~dp0
pause