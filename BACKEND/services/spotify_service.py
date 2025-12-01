GENRE_MAP = {
    "action": "rock",
    "comedy": "pop",
    "romance": "acoustic",
    "drama": "piano",
    "sf_fantasy": "electronic",
    "thriller_horror": "metal",
    "animation": "anime",
    "documentary": "classical"
}

import requests
import base64
import os

class SpotifyService:
    def __init__(self):
        self.client_id = os.getenv("SPOTIFY_CLIENT_ID")
        self.client_secret = os.getenv("SPOTIFY_CLIENT_SECRET")
        self.redirect_uri = os.getenv("SPOTIFY_REDIRECT_URI")
        self.token_url = "https://accounts.spotify.com/api/token"

    def refresh_access_token(self, refresh_token: str):
        auth_header = base64.b64encode(f"{self.client_id}:{self.client_secret}".encode()).decode()

        data = {
            "grant_type": "refresh_token",
            "refresh_token": refresh_token
        }

        headers = {
            "Authorization": f"Basic {auth_header}",
            "Content-Type": "application/x-www-form-urlencoded"
        }

        res = requests.post(self.token_url, data=data, headers=headers)
        res.raise_for_status()
        return res.json()

    def get_access_token(self, code: str):
        auth_header = base64.b64encode(f"{self.client_id}:{self.client_secret}".encode()).decode()

        data = {
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": self.redirect_uri
        }

        headers = {
            "Authorization": f"Basic {auth_header}",
            "Content-Type": "application/x-www-form-urlencoded"
        }

        res = requests.post(self.token_url, data=data, headers=headers)
        res.raise_for_status()
        return res.json()

    def get_user_top_tracks(self, access_token: str):
        headers = {
            "Authorization": f"Bearer {access_token}"
        }
        url = "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=5"
        res = requests.get(url, headers=headers)
        res.raise_for_status()
        return res.json()
import requests
import base64
import os

class SpotifyService:
    def __init__(self):
        self.client_id = os.getenv("SPOTIFY_CLIENT_ID")
        self.client_secret = os.getenv("SPOTIFY_CLIENT_SECRET")
        self.redirect_uri = os.getenv("SPOTIFY_REDIRECT_URI")
        self.token_url = "https://accounts.spotify.com/api/token"

    def refresh_access_token(self, refresh_token: str):
        auth_header = base64.b64encode(f"{self.client_id}:{self.client_secret}".encode()).decode()

        data = {
            "grant_type": "refresh_token",
            "refresh_token": refresh_token
        }

        headers = {
            "Authorization": f"Basic {auth_header}",
            "Content-Type": "application/x-www-form-urlencoded"
        }

        res = requests.post(self.token_url, data=data, headers=headers)
        res.raise_for_status()
        return res.json()

    def get_access_token(self, code: str):
        auth_header = base64.b64encode(f"{self.client_id}:{self.client_secret}".encode()).decode()

        data = {
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": self.redirect_uri
        }

        headers = {
            "Authorization": f"Basic {auth_header}",
            "Content-Type": "application/x-www-form-urlencoded"
        }

        res = requests.post(self.token_url, data=data, headers=headers)
        res.raise_for_status()
        return res.json()

    def get_user_top_tracks(self, access_token: str):
        headers = {
            "Authorization": f"Bearer {access_token}"
        }
        url = "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=5"
        res = requests.get(url, headers=headers)
        res.raise_for_status()
        return res.json()
spotify_service = SpotifyService()
