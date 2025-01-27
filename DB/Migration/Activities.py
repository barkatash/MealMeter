# %% Import modules
import pandas as pd
import csv
# %% Define file path
file_path = "../Data/exercise_dataset.csv"
columns = {
    "Activity, Exercise or Sport (1 hour)": "Description",
    "Calories per kg": "CaloriesPKG",
}
# %% Read file and extract wanted columns
df = pd.read_csv(file_path)
df
# Extract and rename columns
df = df[columns.keys()]
df.rename(columns=columns, inplace=True)
df.index += 1
# %% Drop duplicate rows
df.drop_duplicates(inplace=True)
# %% Export to CSV
df.to_csv(
    "../Data/CSV/Activities.csv",
    index=True,
    quoting=csv.QUOTE_NONNUMERIC
)
# %%
