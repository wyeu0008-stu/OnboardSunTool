import requests
from datetime import datetime

GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search"
AIR_QUALITY_URL = "https://air-quality-api.open-meteo.com/v1/air-quality"


def get_risk_level(uv):
    if uv is None:
        return "Unknown", "UV data is unavailable."
    if uv <= 2:
        return "Low", "Minimal protection required."
    elif uv <= 5:
        return "Moderate", "Stay in shade near midday when possible."
    elif uv <= 7:
        return "High", "Apply sunscreen and seek shade."
    elif uv <= 10:
        return "Very High", "Extra protection is needed. Avoid sun exposure at midday."
    else:
        return "Extreme", "Avoid being outside during midday hours."


def calculate_sunscreen_dosage(uv):
    """
    Calculate recommended sunscreen dosage (in teaspoons) 
    based on UV index level.
    """
    if uv is None:
        return {
            "face": 0,
            "arms": 0,
            "legs": 0,
            "explanation": "UV data unavailable. Unable to calculate dosage."
        }

    if uv <= 2:
        return {
            "face": 0.5,
            "arms": 1,
            "legs": 1,
            "explanation": "Low UV level. Minimal sunscreen required."
        }
    elif uv <= 5:
        return {
            "face": 1,
            "arms": 1.5,
            "legs": 1.5,
            "explanation": "Moderate UV level. Apply sunscreen evenly."
        }
    elif uv <= 7:
        return {
            "face": 1.5,
            "arms": 2,
            "legs": 2,
            "explanation": "High UV level increases burn risk. Use adequate protection."
        }
    else:
        return {
            "face": 2,
            "arms": 3,
            "legs": 3,
            "explanation": "Very high or extreme UV. Reapply frequently and limit exposure."
        }


def geocode_city(city_name):
    params = {
        "name": city_name,
        "count": 1,
        "language": "en",
        "format": "json"
    }

    response = requests.get(GEOCODING_URL, params=params, timeout=10)
    response.raise_for_status()
    data = response.json()

    results = data.get("results", [])
    if not results:
        raise ValueError(f"Location not found: {city_name}")

    location = results[0]
    return {
        "name": location.get("name"),
        "country": location.get("country"),
        "latitude": location.get("latitude"),
        "longitude": location.get("longitude"),
        "timezone": location.get("timezone"),
    }


def fetch_uv_data(latitude, longitude, timezone="auto"):
    params = {
        "latitude": latitude,
        "longitude": longitude,
        "timezone": timezone,
        "current": "uv_index",
        "hourly": "uv_index"
    }

    response = requests.get(AIR_QUALITY_URL, params=params, timeout=10)
    response.raise_for_status()
    return response.json()


def extract_today_hourly(hourly_times, hourly_uv, current_time_str):
    """
    Only retain data for the current.time day.
    """
    if not current_time_str:
        return []

    current_date = current_time_str.split("T")[0]

    today_data = []
    for t, uv in zip(hourly_times, hourly_uv):
        if t.startswith(current_date):
            today_data.append((t, uv))

    return today_data


def find_peak_and_high_period(today_data):
    """
    today_data: [(time_str, uv), ...]
    return:
      peak_uv_value,
      peak_time,
      high_uv_period,
      high_uv_duration
    """
    valid = [(t, uv) for t, uv in today_data if uv is not None]

    if not valid:
        return None, None, "N/A", "0hrs"

    # Find the peak value of the day
    peak_time_str, peak_uv_value = max(valid, key=lambda x: x[1])

    # Find periods with high UV (defined as UV >= 6).
    high_uv_times = [t for t, uv in valid if uv >= 6]

    if not high_uv_times:
        return peak_uv_value, peak_time_str, "N/A", "0hrs"

    start_time = high_uv_times[0]
    end_time = high_uv_times[-1]

    start_dt = datetime.fromisoformat(start_time)
    end_dt = datetime.fromisoformat(end_time)

    duration_hours = int((end_dt - start_dt).total_seconds() / 3600) + 1
    period = f"{start_dt.strftime('%H:%M')}–{end_dt.strftime('%H:%M')}"

    return peak_uv_value, peak_time_str, period, f"{duration_hours}hrs"


def build_uv_info(city_name="Melbourne"):
    location = geocode_city(city_name)
    raw = fetch_uv_data(
        latitude=location["latitude"],
        longitude=location["longitude"],
        timezone="auto"
    )

    current = raw.get("current", {})
    hourly = raw.get("hourly", {})

    current_uv = current.get("uv_index")
    current_time = current.get("time")

    hourly_times = hourly.get("time", [])
    hourly_uv = hourly.get("uv_index", [])

    today_data = extract_today_hourly(hourly_times, hourly_uv, current_time)

    peak_uv_value, peak_time_str, high_uv_period, high_uv_duration = find_peak_and_high_period(today_data)

    # 🔥 改成根据 peak UV 判断风险
    risk_level, message = get_risk_level(peak_uv_value)

    # 🔥 改成根据 peak UV 计算 dosage
    dosage_info = calculate_sunscreen_dosage(peak_uv_value)

    city_display = f'{location["name"]}, {location["country"]}'

    return {
        "uvNumber": round(current_uv) if current_uv is not None else None,
        "city": city_display,
        "riskLevel": risk_level,
        "message": message,
        "updated": current_time.split("T")[1] if current_time and "T" in current_time else current_time,
        "peakUVIndex": round(peak_uv_value) if peak_uv_value is not None else None,
        "peakTime": peak_time_str.split("T")[1] if peak_time_str and "T" in peak_time_str else "N/A",
        "highUVPeriod": high_uv_period,
        "highUVDuration": high_uv_duration,
        "sunscreenDosage": {
            "face": dosage_info["face"],
            "arms": dosage_info["arms"],
            "legs": dosage_info["legs"]
        },
        "dosageExplanation": dosage_info["explanation"]
    }