from services.db_service import get_weather_data, get_cancer_mortality, get_postcodes

def get_weather():
    return get_weather_data()

def get_cancer(cancer_site=None, year=None):
    return get_cancer_mortality(cancer_site, year)

def get_postcodes_data(state=None):
    return get_postcodes(state)
