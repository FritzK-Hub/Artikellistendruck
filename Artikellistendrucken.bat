@echo off


@REM powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0Scripts\Main.ps1" %1 %~n1
@REM start "" "%~dp0Interface\Gui.html"
copy "%~dp0Interface\Head.html" + %1 "%~dp0Interface\Gui.html"
echo ^</p^>^<p id=^"file-name^" class=^"hide^"^>%~n1^</p^>^</body^>^</html^> >> "%~dp0Interface\Gui.html"
start "" "%~dp0Interface\Gui.html"