SET FOLDER="%CD%"
SET PORT=8189

SET IIS="C:\Program Files\IIS Express\iisexpress.exe"

%IIS% /port:%PORT% /path:%FOLDER% /clr:v4.0

REM PAUSE


