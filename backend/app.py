from flask import Flask, jsonify, request
from flask_cors import CORS
from component_calls.uv_info_call import get_uv_info_data
from component_calls.db_call import get_weather, get_cancer, get_postcodes_data

app = Flask(__name__)
CORS(app)

@app.route("/api/components/uv-info", methods=["GET"])
def uv_info_api():
    city = request.args.get("city", "Melbourne")
    try:
        data = get_uv_info_data(city_name=city)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": True, "message": str(e)}), 500

@app.route("/api/components/weather", methods=["GET"])
def weather_api():
    try:
        data = get_weather()
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": True, "message": str(e)}), 500

@app.route("/api/components/cancer", methods=["GET"])
def cancer_api():
    cancer_site = request.args.get("cancer_site")
    year = request.args.get("year")
    try:
        data = get_cancer(cancer_site, year)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": True, "message": str(e)}), 500

@app.route("/api/components/postcodes", methods=["GET"])
def postcodes_api():
    state = request.args.get("state")
    try:
        data = get_postcodes_data(state)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": True, "message": str(e)}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=True)
