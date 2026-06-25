import pandas as pd
import json
import traceback

file_path = r"C:\Users\aadedoyin\Downloads\Adefolarin 1.xlsx"

try:
    xl = pd.ExcelFile(file_path)
    sheet_names = xl.sheet_names
    
    output = {
        "sheets": sheet_names,
        "previews": {}
    }
    
    for sheet in sheet_names:
        df = pd.read_excel(file_path, sheet_name=sheet, nrows=20)
        output["previews"][sheet] = df.to_dict(orient="records")
        
    with open("scratch/excel_preview.json", "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, default=str)
        
    print(f"Successfully processed {len(sheet_names)} sheets. See scratch/excel_preview.json for details.")

except Exception as e:
    print(f"Error processing Excel file: {e}")
    traceback.print_exc()
