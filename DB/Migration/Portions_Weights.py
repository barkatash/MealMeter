# %% Import modules
import pandas as pd
import csv
# %% Define file path
file_path = "../Data/2021-2023 FNDDS At A Glance - Portions and Weights.xlsx"
sheet_name = "Portions and Weights"
columns = {
    "Food code": "FB_ID",
    "Portion description": "Description",
    "Portion weight\n(g)": "Weight"
}
# %% Read file and extract wanted columns
excel_file = pd.ExcelFile(file_path)
df = pd.read_excel(excel_file, sheet_name=sheet_name, header=1)
# Extract and rename columns
df = df[columns.keys()]
df.rename(columns=columns, inplace=True)
# %% Drop duplicate rows
df.drop_duplicates(inplace=True)
# %% Export to CSV
df.to_csv(
    "../Data/CSV/Portions_Weights.csv",
    index=False,
    quoting=csv.QUOTE_NONNUMERIC
)
# %%
