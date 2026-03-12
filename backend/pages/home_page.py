from component_calls.uv_info_call import get_uv_info_component_data
from component_calls.location_call import get_location_component_data


def get_home_page_data():
    return {
        "page": "home",
        "uvInfo": get_uv_info_component_data(),
        "locationInfo": get_location_component_data()
    }