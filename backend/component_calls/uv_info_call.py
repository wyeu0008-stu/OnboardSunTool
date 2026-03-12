from services.uv_service import build_uv_info


def get_uv_info_data(city_name="Melbourne"):
    return build_uv_info(city_name)