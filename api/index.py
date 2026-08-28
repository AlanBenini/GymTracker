from fastapi import FastAPI
from fastapi.responses import JSONResponse

app = FastAPI()

@app.get("/")
@app.get("/exercises")
@app.get("/api/exercises")
def health_check():
    return JSONResponse(status_code=200, content={"status": "online", "message": "Gym Tracker Backend Attivo"})