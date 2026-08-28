import os
import requests
from fastapi import FastAPI, Query
from fastapi.responses import JSONResponse

app = FastAPI()

API_KEY = os.getenv("MUSCLEWIKI_API_KEY", "")
MUSCLEWIKI_BASE_URL = "https://api.musclewiki.com"

@app.get("/api/exercises")
def get_exercises(
    muscle: str = Query(None),
    category: str = Query(None),
    search: str = Query(None),
    limit: int = Query(100)
):
    if not API_KEY:
        return JSONResponse(status_code=500, content={"error": "API Key mancante"})

    headers = {
        "X-API-Key": API_KEY,
        "Accept": "application/json"
    }

    params = {
        "limit": min(limit, 100)
    }
    if muscle:
        params["muscles"] = muscle
    if category:
        params["category"] = category
    if search:
        params["search"] = search

    try:
        response = requests.get(f"{MUSCLEWIKI_BASE_URL}/exercises", headers=headers, params=params, timeout=6)
        if response.status_code == 200:
            return response.json()
        return JSONResponse(status_code=response.status_code, content={"error": response.text})
    except Exception as e:
        return JSONResponse(status_code=502, content={"error": str(e)})