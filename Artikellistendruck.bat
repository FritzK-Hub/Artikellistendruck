@echo off
set "filePath=%1"
powershell -NoProfile -ExecutionPolicy Bypass -File ".\HelperScript.ps1" %filePath%