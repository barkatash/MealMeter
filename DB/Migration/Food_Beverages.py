# %% Import modules
import pandas as pd
import csv
# %% Define file path
file_path = "../Data/2021-2023 FNDDS At A Glance - Foods and Beverages.xlsx"
sheet_name = "Food and Beverages"
columns = {
    "Food code": "ID",
    "Main food description": "Description",
    "Additional food description": "Extra_Description",
    "WWEIA Category number": "WWEIA_ID"
}
# %% Read file and extract wanted columns
excel_file = pd.ExcelFile(file_path)
df = pd.read_excel(excel_file, sheet_name=sheet_name, header=1)
# Extract and rename columns
df = df[columns.keys()]
df.rename(columns=columns, inplace=True)
# %% Remove strange characters from columns
for column in ("Description", "Extra_Description"):
    df[column] = df[column].str.replace(";", ".")
    df[column] = df[column].str.replace("\"", "")
# %% Drop duplicate rows
df.drop_duplicates(inplace=True)
# %% Export to CSV
df.to_csv(
    "../Data/CSV/Food_Beverages.csv",
    index=False,
    quoting=csv.QUOTE_NONNUMERIC
)
# %%
