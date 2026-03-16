from flask import Flask, jsonify, request
from flask_cors import CORS
from component_calls.uv_info_call import get_uv_info_data

app = Flask(__name__)
CORS(app)


@app.route("/api/components/uv-info", methods=["GET"])
def uv_info_api():
    city = request.args.get("city", "Melbourne")

    try:
        data = get_uv_info_data(city_name=city)
        return jsonify(data)
    except Exception as e:
        return jsonify({
            "error": True,
            "message": str(e)
        }), 500


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=True)