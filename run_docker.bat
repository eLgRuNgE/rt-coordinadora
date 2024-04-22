@echo off

echo Verificando si Docker está corriendo...
docker info > NUL 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo Docker no está corriendo. Por favor, inicie Docker y vuelva a intentar.
    exit /b
)

echo Deteniendo servicios existentes...
docker-compose down

echo Construyendo y levantando contenedores...
docker-compose up -d --build

echo La aplicación está corriendo en http://localhost:3000

echo.
echo Para detener y remover los contenedores, ejecute:
echo docker-compose down

pause
