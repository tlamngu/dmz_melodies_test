from fastapi import FastAPI, HTTPException, Depends, Request, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from Modules.secured import SecuredService
import uuid
from pathlib import Path
import json
from datetime import datetime
import os

app = FastAPI()

app.add_middleware( CORSMiddleware, allow_origins=["*"], # Allow requests from any origin allow_credentials=True, 
                   allow_methods=["*"], # Allow all methods (GET, POST, PUT, DELETE, etc.) 
                   allow_headers=["*"], # Allow all headers 
                   )
secured_service = SecuredService()

class RegisterModel(BaseModel):
    email: str
    username: str
    role: str
    password: str

class LoginModel(BaseModel):
    email: str
    password: str

@app.post("/register")
def register_user(user: RegisterModel):
    response = secured_service.create_account(user.email, user.username, user.role, user.password)
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
@app.get("/admin/get_users_data")
def get_user(request: Request):
    adm_token = request.query_params.get('adm_token')
    adm_id = request.query_params.get('adm_id')
    admin_uid_list_file = open("./data/Accounts/Admin_uid_list.json")
    admin_uid_list = json.loads(admin_uid_list_file.read())
    admin_uid_list_file.close()
    users = secured_service.accounts
    for i in admin_uid_list["uids"]:
        print("Admin uid:", adm_id)
        if(adm_id == i):
            # print(users)
            print("Received token:", adm_token)
            print("Token on server:", users[adm_id]["token"])
            if(adm_token == users[adm_id]["token"]):
                filtered_users = [{"uid": u,"email": users[u]["email"], "username": users[u]["username"], "role": ", ".join(users[u]["role"])} for u in users if 'Listener' in users[u]['role'] ]       
                return filtered_users
    raise HTTPException(status_code=403, detail="Permission Denied: Invalid admin token")     
@app.get("/admin/get_artists_data")
def get_user(request: Request):
    adm_token = request.query_params.get('adm_token')
    adm_id = request.query_params.get('adm_id')
    admin_uid_list_file = open("./data/Accounts/Admin_uid_list.json")
    admin_uid_list = json.loads(admin_uid_list_file.read())
    admin_uid_list_file.close()
    users = secured_service.accounts
    for i in admin_uid_list["uids"]:
        print("Admin uid:", adm_id)
        if(adm_id == i):
            # print(users)
            print("Received token:", adm_token)
            print("Token on server:", users[adm_id]["token"])
            if(adm_token == users[adm_id]["token"]):
                filtered_users = [{"uid": u,"email": users[u]["email"], "username": users[u]["username"], "role": ", ".join(users[u]["role"])} for u in users if 'Artist' in users[u]['role'] ]       
                return filtered_users
    raise HTTPException(status_code=403, detail="Permission Denied: Invalid admin token")     

def verify_token(token: str, role: str):
    # Check if the token belongs to an Artist or Admin
    accounts = secured_service.accounts
    for user_id, user_data in accounts.items():
        if user_data['token'] == token and role in user_data['role'] and user_data['token_expiry'] > datetime.now().timestamp():
            return user_id
    raise HTTPException(status_code=403, detail="Invalid or expired token")
# Load account data


def verify_token(token: str, required_role: str):
    # Check if the token belongs to an Artist or Admin
    accounts = secured_service.accounts
    for user_id, user_data in accounts.items():
        if user_data['token'] == token and required_role in user_data['role'] and user_data['token_expiry'] > datetime.now().timestamp():
            return user_id
    raise HTTPException(status_code=403, detail="Invalid or expired token")

@app.get("/cdn/contents_list")
def get_content_list():
    with open("./data/Musics/musicsData.json", "r", encoding="utf-8") as contents_list_f, \
         open("./data/Albums/albumsData.json", "r", encoding="utf-8") as albums_list_f:
        contents_list = json.load(contents_list_f)
        albums_list = json.load(albums_list_f)

    return_list = {
        "Musics": [i for i in contents_list["MusicsData"]],
        "Albums": [i for i in albums_list["AlbumsData"]]
    }
    return return_list

@app.post("/cdn/upload/music")
async def upload_music(
    token: str = Form(...),
    artist_id: str = Form(...),
    title: str = Form(...),
    file: UploadFile = File(...),
    music_img: UploadFile = File(None)
):
    # Validate the token
    verify_token(token, "Artist")

    music_id = f"#{uuid.uuid4().hex[:5]}"
    file_location = f"./data/Musics/MusicsFile/{music_id}.mp3"

    # Save the music file
    with open(file_location, "wb") as f:
        f.write(file.file.read())

    music_img_location = None
    if music_img:
        music_img_location = f"./data/Musics/Img/{music_id}.png"
        with open(music_img_location, "wb") as f:
            f.write(music_img.file.read())

    musics_data_path = Path("./data/Musics/musicsData.json")

    # Update musicsData.json
    with musics_data_path.open("r+", encoding="utf-8") as musics_file:
        musics_data = json.load(musics_file)
        new_music_entry = {
            "MusicID": music_id,
            "MusicTitle": title,
            "MusicFile": f"{music_id}.mp3",
            "MusicImg": music_img_location if music_img else None,
            "Authors": [artist_id],
            "AlbumID": [],
            "StreamCount": 0
        }
        musics_data["MusicsData"].append(new_music_entry)
        musics_file.seek(0)
        json.dump(musics_data, musics_file, ensure_ascii=False, indent=4)

    return {"detail": "Music file uploaded successfully", "music_id": music_id}

@app.post("/cdn/upload/album")
async def upload_album(
    token: str = Form(...),
    artist_id: str = Form(...),
    title: str = Form(...),
    music_ids: str = Form(...),
    album_img: UploadFile = File(None)
):
    # Validate the token
    verify_token(token, "Artist")

    album_id = f"ALB{uuid.uuid4().hex[:5]}"
    music_ids_list = music_ids.split(",")

    album_img_location = None
    if album_img:
        album_img_location = f"./data/Albums/AlbumsFile/{album_id}.png"
        with open(album_img_location, "wb") as f:
            f.write(album_img.file.read())

    albums_data_path = Path("./data/Albums/albumsData.json")

    # Update albumsData.json
    with albums_data_path.open("r+", encoding="utf-8") as albums_file:
        albums_data = json.load(albums_file)
        new_album_entry = {
            "AlbumID": album_id,
            "AlbumTitle": title,
            "AlbumImg": album_img_location if album_img else None,
            "Authors": [artist_id],
            "Musics": music_ids_list,
            "StreamCount": 0
        }
        albums_data["AlbumsData"].append(new_album_entry)
        albums_file.seek(0)
        json.dump(albums_data, albums_file, ensure_ascii=False, indent=4)

    # Update musicsData.json to reference the new album
    musics_data_path = Path("./data/Musics/musicsData.json")
    with musics_data_path.open("r+", encoding="utf-8") as musics_file:
        musics_data = json.load(musics_file)
        for music in musics_data["MusicsData"]:
            if music["MusicID"] in music_ids_list:
                music["AlbumID"].append(album_id)
        musics_file.seek(0)
        json.dump(musics_data, musics_file, ensure_ascii=False, indent=4)

    return {"detail": "Album created successfully", "album_id": album_id}


@app.delete("/cdn/delete/music")
def del_music(request: Request):
    try:
        token = request.query_params.get('token')
        uid = request.query_params.get('uid')
        music_id = request.query_params.get('music_id')
        users = secured_service.accounts

        if not token or not uid or not music_id:
            raise HTTPException(status_code=400, detail="Missing required parameters (token, uid, music_id)")

        with open("./data/Accounts/Admin_uid_list.json") as f:
            admin_uid_list = json.load(f).get('uids', [])

        if uid not in users:
            raise HTTPException(status_code=404, detail="User not found")

        user = users[uid]

        if user["token"] != token:
            raise HTTPException(status_code=403, detail="Invalid token")

        if "Artist" not in user["role"] and "Admin" not in user["role"]:
            raise HTTPException(status_code=403, detail="Permission denied: User is not an artist or admin")

        with open("./data/Musics/musicsData.json", encoding="utf-8") as f:
            musics_data = json.load(f)

        music_found = False
        for i, music in enumerate(musics_data["MusicsData"]):
            if music["MusicID"] == music_id:
                if uid in admin_uid_list or uid in music["Authors"]:
                    del musics_data["MusicsData"][i]
                    music_found = True
                    break
                else:
                    raise HTTPException(status_code=403, detail="Permission denied: User is not authorized to delete this music")
        
        if not music_found:
            raise HTTPException(status_code=404, detail="Music not found")


        with open("./data/Musics/musicsData.json", "w", encoding="utf-8") as f:
            json.dump(musics_data, f, ensure_ascii=False, indent=4)

        try:
            os.remove(f"./data/Musics/MusicsFile/{music_id}.mp3")
            os.remove(f"./data/Musics/Img/{music_id}.png")
        except FileNotFoundError:
            print(f"Warning: Music file not found for {music_id}")
        except Exception as e:
            print(f"Error removing music file for {music_id}: {e}")

        if music.get("AlbumID"):
            try:
                with open("./data/Albums/albumsData.json", encoding="utf-8") as f:
                    album_data = json.load(f)
                for i, album in enumerate(album_data["AlbumsData"]):
                    if album["AlbumID"] == music["AlbumID"][0]:
                        if music_id in album["Musics"]:
                            album["Musics"].remove(music_id)
                        if not album["Musics"]:
                            del album_data["AlbumsData"][i]
                        with open("./data/Albums/albumsData.json", "w", encoding="utf-8") as f:
                            json.dump(album_data, f, ensure_ascii=False, indent=4)
                        break

            except FileNotFoundError:
                print("Warning: Album data file not found")
            except Exception as e:
                print(f"Error updating album data: {e}")


        return {"status": "successfully removed"}

    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8888)
