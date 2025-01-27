import pandas as pd
import random

max_id = 308
N_RANDOMISE = 1_000 * max_id

fb_id_list = tuple(pd.read_csv("../Data/CSV/Food_Beverages.csv")["ID"])
min_portion, max_portion = 100, 300
min_year, max_year = 2023, 2024
min_month, max_month = 1, 12
min_day, max_day = 1, 28


def generate_portion(range_portion):
    return random.randint(*range_portion)

def generate_datetime(range_year, range_month, range_day):
    year = random.randint(*range_year)
    month = random.randint(*range_month)
    day = random.randint(*range_day)
    hour = random.randint(0, 23)
    minute = random.randint(0, 59)
    return f"{year}-{month}-{day} {hour}:{minute}"

def main():
    rows = []
    for _ in range(N_RANDOMISE):
        user_id = random.randint(1, max_id)
        fb_id = random.choice(fb_id_list)
        portion = generate_portion((min_portion, max_portion))
        date = generate_datetime(
            (min_year, max_year),
            (min_month, max_month),
            (min_day, max_day)
        )
        row = (
            user_id,
            fb_id,
            portion,
            date
        )
        rows.append(row)
    return rows

if __name__ == "__main__":
    # Generate rows
    rows = main()
    # Define DataFrame
    df = pd.DataFrame(
        rows,
        columns=["User_ID", "FB_ID", "Portion_Weight", "Date_Time"]
    )
    # Export to CSV
    df.to_csv("User_Food_Beverages.csv", index=False)
