import requests
import time
import json
import sys
import os

def render_video(json_payload, api_key):
    url = "https://api.shotstack.io/edit/v1/render"
    headers = {
        "Content-Type": "application/json",
        "x-api-key": api_key
    }
    
    print(f"🚀 Iniciando renderização no Shotstack...")
    response = requests.post(url, headers=headers, json=json_payload)
    
    if response.status_code != 201:
        print(f"❌ Erro ao iniciar render: {response.text}")
        return None
        
    render_id = response.json().get("response", {}).get("id")
    print(f"✅ Render ID: {render_id}")
    
    # Polling
    status_url = f"https://api.shotstack.io/edit/v1/render/{render_id}"
    while True:
        status_resp = requests.get(status_url, headers=headers)
        status_data = status_resp.json().get("response", {})
        status = status_data.get("status")
        
        if status == "done":
            video_url = status_data.get("url")
            print(f"🎬 Vídeo pronto! URL: {video_url}")
            return video_url
        elif status == "failed":
            print(f"❌ Falha na renderização: {status_data.get('error')}")
            return None
        else:
            print(f"⏳ Status: {status}... aguardando 10 segundos.")
            time.sleep(10)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Uso: python render_video.py <payload_json_path> <api_key>")
        sys.exit(1)
        
    json_path = sys.argv[1]
    api_key = sys.argv[2]
    
    with open(json_path, 'r', encoding='utf-8') as f:
        payload = json.load(f)
        
    render_video(payload, api_key)
