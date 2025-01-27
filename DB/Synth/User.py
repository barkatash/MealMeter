import random
import pandas as pd

m_first_names = (
    "Yossi", "Avi", "Daniel", "Haim", "David",
    "Moshe", "Samuel", "Ariel", "Noam", "Yosef", "Adam"
)
f_first_names = (
    "Yael", "Ruth", "Tamar", "Shira", "Dana",
    "Shani", "Tali", "Avigail", "Sarah", "Rachel", "Bar"
)
last_names = (
    "Cohen", "Levi", "Israeli", "Mizrahi", "Perez",
    "Ben-David", "Shalom", "Golan", "Katz", "Levy",
    "Bar-Lev", "Shapira", "Sofer", "Shwartz"
)
min_weight, max_weight = 50, 200
min_dob_year, max_dob_year = 1970, 2000
min_dob_month, max_dob_month = 1, 12
min_dob_day, max_dob_day = 1, 28


def generate_weight(range_weight):
    return random.randint(*range_weight)

def generate_dob(range_year, range_month, range_day):
    year = random.randint(*range_year)
    month = random.randint(*range_month)
    day = random.randint(*range_day)
    return f"{year}-{month}-{day}"

def main():
    rows = []
    # Men
    for first_name in m_first_names:
        for last_name in last_names:
            email = f"{first_name}.{last_name}@example.com"
            weight = generate_weight((min_weight, max_weight))
            dob = generate_dob(
                (min_dob_year, max_dob_year),
                (min_dob_month, max_dob_month),
                (min_dob_day, max_dob_day)
            )
            row = (
                None,
                email,
                first_name,
                last_name,
                "password",
                dob,
                "M",
                weight
            )
            rows.append(row)
    # Women
    for first_name in f_first_names:
        for last_name in last_names:
            email = f"{first_name}.{last_name}@example.com"
            weight = generate_weight((min_weight, max_weight))
            dob = generate_dob(
                (min_dob_year, max_dob_year),
                (min_dob_month, max_dob_month),
                (min_dob_day, max_dob_day)
            )
            row = (
                None,
                email,
                first_name,
                last_name,
                "password",
                dob,
                "F",
                weight
            )
            rows.append(row)
    return rows


if __name__ == "__main__":
    # Generate rows
    rows = main()
    # Define DataFrame
    df = pd.DataFrame(
        rows,
        columns=["ID", "Email", "First_Name", "Last_Name", "Password", "DOB", "Gender", "Weight"]
    )
    # Define proper id
    df["ID"] = df.index + 1
    # Export to CSV
    df.to_csv("User.csv", index=False)