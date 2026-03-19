from sqlalchemy import create_engine
import pandas as pd

engine = create_engine(
    'mysql+pymysql://admin:Ybzzby123$@database-1.c1aa8k642ltc.ap-southeast-2.rds.amazonaws.com:3306/MYdb'
)

def get_weather_data():
    df = pd.read_sql('SELECT * FROM weather_data ORDER BY timestamp DESC LIMIT 8', engine)
    return df.to_dict(orient='records')

def get_cancer_mortality(cancer_site=None, year=None):
    query = 'SELECT * FROM cancer_mortality WHERE 1=1'
    if cancer_site:
        query += f" AND cancer_site = '{cancer_site}'"
    if year:
        query += f" AND year = {year}"
    query += ' LIMIT 100'
    df = pd.read_sql(query, engine)
    return df.to_dict(orient='records')

def get_postcodes(state=None):
    query = 'SELECT * FROM postcodes_geo WHERE 1=1'
    if state:
        query += f" AND state = '{state}'"
    df = pd.read_sql(query, engine)
    return df.to_dict(orient='records')
