# %% Import modules
import pandas as pd
import csv
# %% Define file path
file_path = "../Data/2021-2023 FNDDS At A Glance - FNDDS Nutrient Values.xlsx"
sheet_name = "FNDDS Nutrient Values"
unwanted_columns = [
    "Food code",
    "Main food description",
    "WWEIA Category number",
    "WWEIA Category description"
]
# %% Read file and extract wanted columns
excel_file = pd.ExcelFile(file_path)
df = pd.read_excel(excel_file, sheet_name=sheet_name, header=1)
# Extract and rename columns
df = df[df.columns.difference(unwanted_columns)]
# %% Standardise nutrient names
# Define a mapping for unit conversion
unit_conversion = {
    "kcal": "kcal",
    "g": "g",
    "mg": "mg",
    "mcg": "mcg",
    "mcg_DFE": "mcg",
    "mcgDFE": "mcg",
    "mg_DFE": "mg",
    "mg_alpha-tocopherol": "mg",
    "mg_phylloquinone": "mg",
    "mcg_RAE": "mcg",
    "mcgRAE": "mcg",
    "D2 + D3": "mcg"
}
# Refine data
nutrients, units = [], []
for raw_column in df.columns:
    # Get nutrient name
    column = raw_column.rsplit("(", 1)[0].strip()
    nutrients.append(str(column))
    # Get unit
    raw_unit = raw_column.rsplit("(", 1)[1].strip(")")
    units.append(unit_conversion[raw_unit])
# %% Create a DataFrame for nutrients
df = pd.DataFrame(
    {
        "Name": nutrients,
        "Unit": units
    },
    dtype=str
)
#%% Drop duplicate rows
df.drop_duplicates(inplace=True)
# %% Export to CSV
# Count index from 1
df.index += 1
df.to_csv(
    "../Data/CSV/Nutrients.csv",
    index=True,
    quoting=csv.QUOTE_ALL
)
# %%
