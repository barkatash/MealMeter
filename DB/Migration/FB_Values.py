# %% Import modules
import pandas as pd
import csv
# %% Define file path
file_path = "../Data/2021-2023 FNDDS At A Glance - FNDDS Nutrient Values.xlsx"
sheet_name = "FNDDS Nutrient Values"
unwanted_columns = [
    "Main food description",
    "WWEIA Category number",
    "WWEIA Category description",
]
# %% Read file and extract wanted columns
excel_file = pd.ExcelFile(file_path)
df = pd.read_excel(excel_file, sheet_name=sheet_name, header=1)
# Extract and rename columns
df = df[df.columns.difference(unwanted_columns)]
df.rename(columns={"Food code": "FB_ID"}, inplace=True)
# %% Rename nutrients
df.rename(
    columns={
        nutrient: nutrient.rsplit("(", 1)[0].strip()
        for nutrient in df.columns.difference(["FB_ID"])
    },
    inplace=True
)
# %% Drop duplicate rows
df.drop_duplicates(inplace=True)
# %% Modify table structure
new_df = pd.melt(df, id_vars=["FB_ID"], var_name="Nutrient", value_name="Value")
nutrients_df = pd.read_csv("../Data/CSV/Nutrients.csv")
index_map = {
    nutrients_df["Name"].iloc[i]: i + 1
    for i in range(len(nutrients_df))
}
new_df["Nutrient_ID"] = new_df["Nutrient"].map(index_map)
new_df.drop(columns=["Nutrient"], inplace=True)
new_df = new_df[["FB_ID", "Nutrient_ID", "Value"]]
# %% Export to CSV
new_df.to_csv(
    "../Data/CSV/FB_Values.csv",
    index=False,
    quoting=csv.QUOTE_NONNUMERIC
)
# %%
