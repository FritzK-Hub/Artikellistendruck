@echo off

chcp 65001 >nul
copy "%~dp0Scripts\HTML\Head.html" + %1 "%~dp0Interface\Gui.html"
echo ^</p^>^</body^>^</html^> >> "%~dp0Interface\Gui.html"
start "" "%~dp0Interface\Gui.html"