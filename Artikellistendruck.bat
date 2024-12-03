@echo off

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0Scripts\Main.ps1" %1 %~n1
pause