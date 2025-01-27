# %% Import modules
import pandas as pd
import csv
# %% Define file path
file_path = "../Data/2021-2023 FNDDS At A Glance - Ingredient Nutrient Values.xlsx"
sheet_name = "Ingredient Nutrient Values"
columns = {
    "Ingredient code": "Ingredient_ID",
    # "Nutrient code": "Nutrient_ID",
    "Nutrient description": "Nutrient",
    "Nutrient value": "Value"
}
# %% Read file and extract wanted columns
excel_file = pd.ExcelFile(file_path)
df = pd.read_excel(excel_file, sheet_name=sheet_name, header=1)
# Extract and rename columns
df = df[columns.keys()]
df.rename(columns=columns, inplace=True)
# %% Drop duplicates
df.drop_duplicates(inplace=True)
# %% Modify table structure
nutrients_df = pd.read_csv("../Data/CSV/Nutrients.csv")
index_map = {
    nutrients_df["Name"].iloc[i]: i + 1
    for i in range(len(nutrients_df))
}
df["Nutrient_ID"] = df["Nutrient"].map(index_map)
df.drop(columns=["Nutrient"], inplace=True)
df = df[["Ingredient_ID", "Nutrient_ID", "Value"]]
# %% Export to CSV
df.to_csv(
    "../Data/CSV/Ingredients_Values.csv",
    index=False,
    quoting=csv.QUOTE_NONNUMERIC
)
# %%
