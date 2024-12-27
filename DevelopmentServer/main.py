from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from Modules.secured import SecuredService

app = FastAPI()

app.add_middleware( CORSMiddleware, allow_origins=["*"], # Allow requests from any origin allow_credentials=True, 
                   allow_methods=["*"], # Allow all methods (GET, POST, PUT, DELETE, etc.) 
                   allow_headers=["*"], # Allow all headers 
                   )
secured_service = SecuredService()

class RegisterModel(BaseModel):
    email: str
    username: str
    password: str

class LoginModel(BaseModel):
    email: str
    password: str

@app.post("/register")
def register_user(user: RegisterModel):
    response = secured_service.create_account(user.email, user.username, user.password)
    if not response['status']:
        raise HTTPException(status_code=400, detail=response['reason'])
    return {"uid": response['uid']}

@app.post("/login")
def login_user(user: LoginModel):
    accounts = secured_service.accounts
    user_data = None
    userID = None
    for uid, account in accounts.items():
        print(account)
        if account['email'] == user.email and account['password'] == secured_service.hash_password(user.password):
            user_data = account
            userID = uid
            print("Logged",userID,"in.")
            break
    if not user_data:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    token = secured_service.generate_token(uid)
    return {"token": token, "uid": userID}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8888)
