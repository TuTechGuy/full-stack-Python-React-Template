from fastapi import APIRouter
from fastapi.responses import JSONResponse


app = APIRouter()


@app.get("/cotizacion/{ticker}")
async def get_cotizacion(ticker: str):
    # Aquí iría la lógica para obtener la cotización real
    cotizacion = {"ticker": ticker, "precio": 100.0}  # Ejemplo de respuesta
    return JSONResponse(content=cotizacion)
