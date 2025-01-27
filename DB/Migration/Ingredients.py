# %% Import modules
import pandas as pd
import csv
# %% Define file path
file_path = "../Data/2021-2023 FNDDS At A Glance - FNDDS Ingredients.xlsx"
sheet_name = "FNDDS Ingredients"
columns = {
    "Ingredient code": "ID",
    "Ingredient description": "Description"
}
# %% Read file and extract wanted columns
excel_file = pd.ExcelFile(file_path)
df = pd.read_excel(excel_file, sheet_name=sheet_name, header=1)
# Extract and rename columns
df = df[columns.keys()]
df.rename(columns=columns, inplace=True)
# %% Remove strange characters from columns
df["Description"] = df["Description"].str.replace("\"", " inch")
# %% Drop duplicate rows
df.drop_duplicates(inplace=True)
# %% Export to CSV
df.to_csv(
    "../Data/CSV/Ingredients.csv",
    index=False,
    quoting=csv.QUOTE_NONNUMERIC
)
# %%
