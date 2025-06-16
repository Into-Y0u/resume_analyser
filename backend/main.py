
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse 
import os
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

# Create uploads directory if not exists
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

origins = ["http://localhost:3000"]  

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True, 
    allow_methods=["*"],  # Allow all HTTP methods or specify specific methods (e.g., ["GET", "POST"])
    allow_headers=["*"],  # Allow all headers or specify specific headers (e.g., ["Authorization"])
)

@app.get("/")
async def hello():
    return {"message" : "Application loaded successfully, Kindly use the right endpoint"}


@app.get("/test/login")
async def login_test():
    try:
        res =  {"access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJcInRlc3QzXCIiLCJleHAiOjE2OTU3MTQzNzB9.LGXf2RVsbtrEiVTvQGRg3T1UzqmnEDEIQi8MF3AC-kI", "token_type" : "bearer"}
        return res
    
    except Exception as ex :
        print("[main][Exception in login_test] {} ".format(ex))
        
        # logging.exception


@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    if not file:
        raise HTTPException(status_code=400, detail="No file provided")

    # Save file to local storage
    file_path = os.path.join(UPLOAD_DIR, file.filename) # type: ignore

    try:
        with open(file_path, "wb") as f:
            f.write(await file.read())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving file: {str(e)}")

    return JSONResponse(content={
        "filename": file.filename,
        "content_type": file.content_type,
        "file_size": os.path.getsize(file_path),
        "location": file_path
    })

# Optional: Add route to list all uploaded files
@app.get("/files/")
async def list_files():
    files = os.listdir(UPLOAD_DIR)
    return {"files": files}