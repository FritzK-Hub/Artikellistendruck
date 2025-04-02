@echo off


copy "%~dp0Interface\Head.html" + %1 "%~dp0Interface\Gui.html"
echo ^</p^>^<p id=^"file-name^" class=^"hide^"^>%~n1^</p^>^</body^>^</html^> >> "%~dp0Interface\Gui.html"
start "" "%~dp0Interface\Gui.html"