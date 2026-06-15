@echo off
echo Starting local Python web server on http://localhost:8000
echo Please do not close this window while using the dashboard.
echo.
python -m http.server 8000
pause
