from flask import Flask, jsonify, request
from flask_cors import CORS
import random, json

app = Flask(__name__)
CORS(app)

# Load 1000 questions
with open("questions-1000.json", "r") as f:
    questions = json.load(f)

games = {}

def shuffle_questions(q_list, num):
    return random.sample(q_list, num)

@app.route("/create_game", methods=["POST"])
def create_game():
    data = request.json
    player1_name = data.get("player1_name", "Player1")
    relationship = data.get("relationship", "friend")
    num_questions = int(data.get("num_questions", 10))
    game_code = str(random.randint(100000, 999999))
    selected_questions = shuffle_questions(questions, num_questions)
    games[game_code] = {
        "player1_name": player1_name,
        "relationship": relationship,
        "num_questions": num_questions,
        "questions": selected_questions,
        "player1_answers": [],
        "player2_answers": [],
        "joined": False
    }
    return jsonify({"game_code": game_code, "questions": selected_questions})

@app.route("/join_game", methods=["POST"])
def join_game():
    data = request.json
    game_code = data.get("game_code")
    player2_name = data.get("player2_name", "Player2")
    if game_code not in games:
        return jsonify({"error": "Game not found"}), 404
    games[game_code]["joined"] = True
    games[game_code]["player2_name"] = player2_name
    return jsonify({"message": f"{player2_name} joined", "questions": games[game_code]["questions"]})

@app.route("/submit_answers", methods=["POST"])
def submit_answers():
    data = request.json
    game_code = data.get("game_code")
    player = data.get("player")
    answers = data.get("answers", [])
    if game_code not in games:
        return jsonify({"error": "Game not found"}), 404
    if player == "player1":
        games[game_code]["player1_answers"] = answers
    else:
        games[game_code]["player2_answers"] = answers
    return jsonify({"message": "Answers recorded successfully"})

@app.route("/score/<game_code>", methods=["GET"])
def score(game_code):
    if game_code not in games:
        return jsonify({"error": "Game not found"}), 404
    game = games[game_code]
    score = 0
    for i, ans in enumerate(game.get("player1_answers", [])):
        if i < len(game.get("player2_answers", [])):
            if game["player2_answers"][i].lower() == ans.lower():
                score += 1
    return jsonify({"score": score, "total": len(game["player1_answers"])})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
